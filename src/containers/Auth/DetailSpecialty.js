import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import './DetailSpecialty.scss';
import { Modal } from 'reactstrap';
import * as actions from "../../store/actions";
import BookingModal from './Modal/BookingModal';
import { withRouter } from 'react-router'
import moment from 'moment/moment';
import localization from 'moment/locale/vi'
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { listSpecialist } from '../../api/listSpecialist';

// import { userService } from '../../services/userService';import Select from 'react-select'
class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // arrDoctorId: [45, 46]
            alldays: [],
            allAvailableTime: [],
            data: [],
            isOpenModalBooking: false,
            datasheduletimemodal: {}
        }
    }
    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }
    HandleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            datasheduletimemodal: time
        })
        console.log('modal: time: ', time)
    }
    async componentDidMount() {
        let { language } = this.props;
        console.log('moment vie: ', moment(new Date()).format('dddd - DD/MM'));
        console.log('moment en: ', moment(new Date()).locale('en').format("ddd - DD/MM"));
        let alldays = []
        for (let i = 0; i < 7; i++) {
            let Object = {};
            Object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            Object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            alldays.push(Object);
        }
        this.setState({
            alldays: alldays,
        })
        this.fetchSpecialistData();

    }
    fetchSpecialistData = () => {
        listSpecialist()
            .then(data => {
                this.setState({ data: data });
                // Sau khi lấy dữ liệu từ API, bạn cũng có thể gọi hàm filterDoctors để lọc dữ liệu ban đầu
                // this.filterDoctors(this.state.searchQuery);
            })
            .catch(error => {
                console.log(error);
            });
    }
    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push('/home')
        }
    }
    handleOnChangeSelect = (event) => {
        // if (this.props.match && this.props.match.params && this.props.match.params.id) {
        //     let doctorId = this.props.match.params.id;
        // }
        // console.log('event onchange date value: ', envent.target.value)

    }


    render() {
        let { alldays, allAvailableTime, isOpenModalBooking, datasheduletimemodal } = this.state;
        let { language } = this.props;
        const { data } = this.state;

        return (
            <div>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <div className="logo"><i className="far fa-hospital"></i>  <Link to="/" style={{ color: "black", textDecoration: "none" }}>BỆNH VIỆN A</Link>

                            </div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <Link to="/Detail-Specialty"><b style={{ color: "black", textDecoration: "none" }}>Chuyên khoa</b></Link>
                                <div className="subs-title">Tìm các bác sĩ theo từng chuyên khoa</div>
                            </div>
                            <div className="child-content">
                                <Link to="/list-doctor"><b style={{ color: "black", textDecoration: "none" }}>Bác sĩ</b></Link>
                                <div className="subs-title">Tìm các bác sĩ giỏi</div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support"><i className="fas fa-question-circle"></i>Help</div>
                            <div className="logout">
                                <span>Đăng xuất</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="search">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
                </div>
                {data.map((item, index) => (
                    <div className="detail-specialty-doctor">
                        <div className="content-left">
                            <div className="intro-doctor">
                                <div className="content-left">
                                    <img src={item.img} className="bacsi">

                                    </img>

                                </div>
                                <div className="content-right">
                                    <div className="Up">
                                        {item.name}
                                    </div>
                                    <div className="Down">Nguyên Trưởng phòng chỉ đạo tuyến tại Bệnh viện Da liễu Trung ương Bác sĩ từng công tác tại Bệnh viện Da liễu Trung ương Nguyên Tổng Thư ký Hiệp hội Da liễu Việt Nam</div>
                                </div>
                            </div>
                        </div>
                        <div className="content-right">
                            <div className="schedule-doctor">
                                <div className="content-left1">
                                    <select onChange={(event) => this.handleOnChangeSelect(event)}>
                                        {alldays && alldays.length > 0 &&
                                            alldays.map((item, index) => {
                                                return (
                                                    <option value={item.value} key={index}>{item.label}</option>
                                                )
                                            })}
                                    </select>
                                    <div className="all-available-time">
                                        <div className="text-calendar">
                                            <i className="fas fa-calendar-alt"> <span>Lịch Khám</span></i>
                                        </div>
                                        <div className="time-content">
                                            <div className="a" onClick={() => this.HandleClickScheduleTime()}>
                                                <button>6:00 - 7:00</button>
                                                <button>7:00 - 8:00</button>
                                                <button>8:00 - 9:00</button>
                                                {/* <button>9:00 - 10:00</button>
                                        <button>10:00 - 11:00</button>
                                        <button>11:00 - 12:00</button>
                                        <button>12:00 - 13:00</button>
                                        <button>13:00 - 14:00</button>
                                        <button>14:00 - 15:00</button> */}
                                            </div>
                                            {/* {allAvailableTime && allAvailableTime.length > 0 &&
                                        allAvailableTime.map((item, index) => {
                                            return (
                                                <button key={index}>{ }</button>
                                            )
                                        })} */}

                                            <div className="book-free">
                                                <span>Chọn <i className="far fa-hand-point-up"></i> và đặt miễn phí</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="doctor-extra-infor-container">
                                        <div className="content-up">
                                            <div className="text-address">ĐỊA CHỈ PHÒNG KHÁM</div>
                                            <div className="name-clinic"> {item.address}</div>
                                            <div className="detail-address">{item.email}</div>
                                        </div>
                                        <div className="content-down">
                                            <div>GIÁ KHÁM: 250.000 VNĐ</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))};


                <div className="comment">

                </div>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    closeBookingModal={this.closeBookingModal}
                    datatime={datasheduletimemodal}>
                </BookingModal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
