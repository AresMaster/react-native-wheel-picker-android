import TimeColumns from "./time-columns";

import { View } from "react-native";
import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import styles from "./styles";
import DateColumns from "./date-columns";
import { normalizeDate, normalizeMinMaxDates } from "./utils";

export default class DatePicker extends PureComponent {
    static propTypes = {
        mode: PropTypes.oneOf(["date", "time", "datetime"]).isRequired,
        date: PropTypes.instanceOf(Date),
        // TODO: initialDate
        onDateChange: PropTypes.func.isRequired,
        minimumDate: PropTypes.instanceOf(Date),
        maximumDate: PropTypes.instanceOf(Date),
        minuteInterval: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30]),
        styles: PropTypes.object,
        locale: PropTypes.string,
        todayTitle: PropTypes.string
    };

    static defaultProps = {
        mode: "date",
        todayTitle: "Today",
        minuteInterval: 1
    };

    constructor(props, ...args) {
        super(props, ...args);

        let date = (props.date && new Date(props.date.valueOf())) || new Date();
        const { minimumDate, maximumDate } = normalizeMinMaxDates(
            date,
            props.minimumDate,
            props.maximumDate
        );
        date = normalizeDate(date, minimumDate, maximumDate);

        this.state = {
            date,
            minimumDate,
            maximumDate,
            timeOnly: props.mode === "time",
            dateOnly: props.mode === "date"
        };

        this.styles = styles(props.styles);
    }

    render() {
        return (
            <View style={[this.styles.container, this.props.style]}>
                {this.renderDate()}
                {this.renderTime()}
            </View>
        );
    }

    renderDate() {
        const { date, minimumDate, maximumDate, dateOnly, timeOnly } = this.state;
        if (timeOnly) return null;

        const { locale, todayTitle } = this.props;
        return (
            <DateColumns
                dateOnly={dateOnly}
                date={date}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                onChange={this.onChange}
                styles={this.styles}
                locale={locale}
                todayTitle={todayTitle}
            />
        );
    }

    renderTime() {
        const { date, dateOnly, timeOnly } = this.state;
        if (dateOnly) return null;

        const { locale, minuteInterval } = this.props;
        return (
            <TimeColumns
                timeOnly={timeOnly}
                date={date}
                minuteInterval={minuteInterval}
                onChange={this.onChange}
                styles={this.styles}
                locale={locale}
            />
        );
    }

    onChange = change => {
        const { minimumDate, maximumDate } = this.state;
        let date = this.state.date;

        if (change.year && change.month && change.date) {
            date.setFullYear(change.year, change.month, change.date);
        }

        if (change.hours >= 0 || change.minutes >= 0) {
            date.setHours(change.hours);
            date.setMinutes(change.minutes);
            date.setSeconds(0);
        }

        date = normalizeDate(date, minimumDate, maximumDate);

        if (date !== this.state.date) this.setState({ date });

        this.props.onDateChange(new Date(date.valueOf()));
    };
}
