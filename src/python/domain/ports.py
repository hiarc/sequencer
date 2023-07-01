import mido


class Ports:
    @staticmethod
    def get_output_ports():
        return mido.get_output_names()

    # 指定したMIDI出力ポートをオープンして返却する。
    # ポートを指定していない場合や、指定したポートが利用できない場合は、最初に検出されたポートを開放して返却する。
    # 利用可能なポートが存在しない場合や、指定したポートが利用できない場合は例外を発生させる。
    @staticmethod
    def open_output_port(port_name: str):
        ports = mido.get_output_names()
        if port_name in ports:
            # TODO: 開いたポートを自動的に閉じるようにする
            return mido.open_output(port_name)
        elif len(ports) > 0:
            return mido.open_output(ports[0])
        else:
            raise Exception("No Avairable MIDI Output Port." + port_name)
