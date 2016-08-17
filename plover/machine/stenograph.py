# -*- coding: utf-8 -*-
# Copyright (c) 2013 Hesky Fisher
# See LICENSE.txt for details.

# TODO: add tests

"Thread-based monitoring of a stenotype machine using the Treal machine."

from usb import core, util
from time import sleep
from plover import log
from plover.machine.base import ThreadedStenotypeBase

# ^ is the "stenomark"
STENO_KEY_CHART = (('^', '#-', 'S-', 'T-', 'K-', 'P-'),
                   ('W-', 'H-', 'R-', 'A-', 'O-', '*'),
                   ('-E', '-U', '-F', '-R', '-P', '-B'),
                   ('-L', '-G', '-T', '-S', '-D', '-Z'),
                  )

def packet_to_stroke(p):
   keys = []
   for i, b in enumerate(p):
       map = STENO_KEY_CHART[i]
       for i in range(8):
           if (b >> i) & 1:
               key = map[-i + 7]
               if key:
                   keys.append(key)
   return keys

VENDOR_ID = 0x112b
MAX_OFFSET = 0xFFFFFFFF


class Stenograph(ThreadedStenotypeBase):

    KEYS_LAYOUT = '''
        #  #  #  #  #  #  #  #  #  #
        S- T- P- H- * -F -P -L -T -D
        S- K- W- R- * -R -B -G -S -Z
              A- O-   -E -U
        ^
    '''

    def __init__(self, params):
        super(Stenograph, self).__init__()
        self._endpoint_in = None
        self._endpoint_out = None

    def _on_stroke(self, keys):
        steno_keys = self.keymap.keys_to_actions(keys)
        if steno_keys:
            self._notify(steno_keys)

    def _connect(self):
        connected = False
        try:
            dev = core.find(idVendor=VENDOR_ID)
            if dev is None:
                raise ValueError('Device not found')
            dev.set_configuration()
            # get an endpoint instance
            cfg = dev.get_active_configuration()
            intf = cfg[(0, 0)]

            self._endpoint_out = util.find_descriptor(
                intf,
                # match the first OUT endpoint
                custom_match = \
                lambda e: \
                util.endpoint_direction(e.bEndpointAddress) == \
                util.ENDPOINT_OUT)

            assert self._endpoint_out is not None

            self._endpoint_in = util.find_descriptor(
                intf,
                # match the first IN endpoint
                custom_match = \
                lambda e: \
                util.endpoint_direction(e.bEndpointAddress) == \
                util.ENDPOINT_IN)

            assert self._endpoint_in is not None
            connected = True
        except Exception as e:
            print(e.message)
        return connected

    def start_capture(self):
        """Begin listening for output from the stenotype machine."""
        if not self._connect():
            log.warning('Stenograph machine is not connected')
            self._error()
            return
        super(Stenograph, self).start_capture()

    def _reconnect(self):
        self._endpoint_in = None
        self._endpoint_out = None
        self._initializing()

        connected = self._connect()
        # Reconnect loop
        while not self.finished.isSet() and not connected:
            sleep(0.5)
            connected = self._connect()
        return connected

    def run(self):
        self._ready()
        file_offset = 0
        sequence_number = 0
        packet = bytearray(
            [0x53, 0x47,  # SG → sync (static)
             0, 0, 0, 0,  # Sequence number
             0x13, 0,  # Action (static)
             0, 0, 0, 0,  # Data length
             0, 0, 0, 0,  # File offset
             0x08, 0, 0, 0,  # Requested byte count (static)
             0, 0, 0, 0,  # Parameter 3
             0, 0, 0, 0,  # Parameter 4
             0, 0, 0, 0,  # Parameter 5
             ]
        )

        while not self.finished.isSet():
            sequence_number = (sequence_number + 1) % 255
            packet[2] = sequence_number
            for i in range(4):
                packet[12 + i] = file_offset >> 8 * i & 255
            try:
                self._endpoint_out.write(packet)
                data = self._endpoint_in.read(128, 3000)
            except Exception as e:
                print('Exception')
                print(e.message)
            else:
                if data is not None and len(data) > 32:
                    print(data)
                    steno = data[33:37]
                    print(steno)
                    keys = []
                    for i, b in enumerate(steno):
                        map = STENO_KEY_CHART[i]
                        b = b >> 2 # Get rid of 11
                        for i in range(6):
                            if (b >> i) & 1:
                                key = map[-i + 5]
                                if key:
                                    keys.append(key)
                    steno_keys = self.keymap.keys_to_actions(keys)
                    if steno_keys:
                        self._notify(steno_keys)
                    file_offset += len(data) - 32

    def stop_capture(self):
        """Stop listening for output from the stenotype machine."""
        super(Stenograph, self).stop_capture()
        self._endpoint_in = 0
        self._endpoint_out = 0
        self._stopped()
