import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import { connect } from "react-redux";
import logo from "./../logo.svg";
import * as actionCreator from "../store/actions/actions";

//const tokenKey = "token";

class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			weatherList: ''
		}
	}

	componentDidMount() {
		this.props.loadWeatherData();
	}

	weatherList = (props) => {
		const weather = this.props.data.map(function (val, key) {
			const img = 'http://openweathermap.org/img/w/' + val.weather[0].icon + '.png';
			return (
				<div className="col-sm-4" key={key + 1}>
					<div key={key + 2} >
						<div key={key + 3}>
							<p key={key + 4}> date And Time:{val.dt_txt} <span key={key + 5}><img key={key + 6} src={img} alt = {'Not Found'} /></span> </p>
							<p key={key + 7} >Main: {val.weather[0].main}</p> 
							<p key={key + 8}>Description : {val.weather[0].description} </p>

						</div>

					</div>
					<hr key={key + 9} />
				</div>

			);

		})

		return weather;

	}

	

	render() {
		if (!auth.getJwt()) {
			window.location = "/login";
		}

		return (
			<div>
				<div className="row " style={{ backgroundColor: 'black', marginBottom: '25px' }} >
					<div className="col-sm-2">
						<h3>Dashboard </h3>
					</div>
					<div className="col-sm-8"></div>
					<div className="col-sm-2">
						<Link className="nav-link" to="/logout">
							Logout
          	</Link>
					</div>

				</div>
				{this.props.loading && <img src={logo} className="App-logo" style={{ marginLeft: '35%' }} />}

				<h1 style={{ marginLeft: '35%', textDecoration: 'underline' }}>5 Days Weather Forcast</h1>
				<div className="row">
					{(this.props.data === 'Error' || this.props.data === undefined) ? <h1 style={{ marginLeft: '35%', textDecoration: 'underline' }}>Technical Issue</h1> :
						(this.props.data.length > 0) ? this.weatherList() : <h1 style={{ marginLeft: '35%', textDecoration: 'underline' }}>Waiting...</h1>
					}
				</div>

			</div>
		);
	}
}

const mapStateToProps = state => {

	return {
		data: state.data,
		loading: state.loading
	};
};

const mapDispachToProps = dispatch => {
	return {
		loadWeatherData: () => dispatch(actionCreator.loadWeatherData(1))

	};
};
export default connect(
	mapStateToProps,
	mapDispachToProps
)(Dashboard);

