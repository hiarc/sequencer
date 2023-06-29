import mido


class Ports:
    @staticmethod
    def get_output_ports():
        ports = mido.get_output_names()
        return ports
