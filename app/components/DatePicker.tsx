import * as React from "react"
import RNDateTimePicker from "@react-native-community/datetimepicker"
import { Modal, Portal } from "react-native-paper"
import { Button } from "./Button"

type Props = {
  show: boolean,
  setShow: (show: boolean) => void,
  date: Date,
  setDate: (date: Date) => void,
};
type MyState = { date: Date };

export class DatePicker extends React.Component<Props, MyState> {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
    }
  }


  render() {

    const onChange = (event, selectedDate) => {
      this.setState({ date: selectedDate })
    }
    const containerStyle = { backgroundColor: "white", padding: 60 }

    return (
      <Portal>
        <Modal visible={this.props.show} contentContainerStyle={containerStyle}>
          <Button onPress={() => {
            this.props.setShow(false);
            this.props.setDate(this.state.date);
          }} text={"save"} />
          <Button onPress={() => this.props.setShow(false)} text={"Cancel"} />
          <RNDateTimePicker
            testID="dateTimePicker"
            value={this.props.date}
            mode={"date"}
            is24Hour={true}
            display="spinner"
            onChange={onChange}
          />
        </Modal>
      </Portal>


    )
  };
}