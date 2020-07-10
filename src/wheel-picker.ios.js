import React from 'react'
import { requireNativeComponent, Text } from 'react-native';
import { Picker } from '@react-native-community/picker';
type Props = {
    data: Array<string>,
    selectedItem?: number,
    onItemSelected?: number => void
}

type State = {
    selectedItem: number
}

export default class WheelPicker extends React.Component<Props, State> {
    static defaultProps = {
        style: {
            width: '90%',
            height: '100%'
        },
    }

    constructor(props: Props) {
        super(props)
        this.state = {
            selectedItem: props.selectedItem
        }
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (prevState.selectedItem !== this.props.selectedItem) {
            this.setState({ selectedItem: this.props.selectedItem })
        }
    }

    onItemSelected = (value: any, index: number) => {
        if (this.props.onItemSelected) {
            this.props.onItemSelected(index)
        }
        this.setState({ selectedItem: index })
    }

    render() {
        const data = this.props.data
        if (!data || !data.length < 0) return null
        return (
            <Picker
                {...this.props}
                itemStyle={{ width: '90%', height: '100%' }}
                selectedValue={data[this.state.selectedItem]}
                onValueChange={this.onItemSelected}>
                {this.props.data.map((i, index) => <Picker.Item key={index} label={i} value={i} />)}
            </Picker>
        )
    }
}
