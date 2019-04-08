import axios from 'axios';
export const loading = () => {
  return {
    type: "LOADING"
  };
};

export const loadWeatherData = () => {
  return dispatch => {
    dispatch(loading());
    loadWeatherDataAsnc(dispatch);
  };
};

export const loadWeatherDataAsnc = (dispatch) => {
  getLocation();
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
    showPosition();
  }

  function showPosition(position) {
    var url;
    if (position === undefined) {
      url = `https://api.openweathermap.org/data/2.5/forecast?appid=8c60ee223a16786b52ba74279f0e3eae&id=524901`;
    } else {
      const long = position.coords.longitude;
      const lati = position.coords.latitude;
      url = `https://api.openweathermap.org/data/2.5/forecast?appid=8c60ee223a16786b52ba74279f0e3eae&lat=${lati}&lon=${long}`;
    }

	axios.get(url)
	.then(function (response) {
		dispatch({
          type: 'LOAD_WEATHER_DATA',
          value: response.data.list
        });
	})
	.catch(function (error) {
		dispatch({
          type: 'LOAD_WEATHER_DATA_ERROR',
          value: 'Error'
        });
	});
  }
};

