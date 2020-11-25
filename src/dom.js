import helpers from './helpers';
import api from './api';

const dom = {
  getFormInputValues: form => {
    let inputs = form.getElementsByTagName('input');
    inputs = Array.from(inputs);
    const inputValues = {};
    inputs.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  },
  submitCityForm: form => {
    const formInfo = dom.getFormInputValues(form);
    return api.fetchCityData(formInfo.city);
  },
  applyButtonEventListener: () => {
    const cityFormButton = document.getElementById('submit-city-form-button');
    cityFormButton.addEventListener('click', event => {
      dom.submitCityForm(event.target.parentElement).then(data => {
        dom.displayWeather(data);
        console.log(data);
      });
    });
  },
  removePreviousDisplay: () => {
    let display = document.getElementById("display-section");
    if (display) {
      display.parentNode.removeChild(display)
    };
  },
  displayWeather: data => {
    dom.removePreviousDisplay();
    let formSection = document.getElementsByTagName('body')[0].children[0];
    let display = helpers.createContent({
      element: "section",
      id: "display-section",
      classList: ['display-section', 'container'],
      children: [
        {
          element: "div",
          classList: ["card", "my-3"],
          children: [
            {
              element: 'div',
              classList: ['row', "no-gutters"],
              children: [
                {
                  element: 'div',
                  classList: ['col-3'],
                  children: [
                    {
                      element: 'img',
                      src: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
                      classList: ['weather-icon', 'card-img']
                    }
                  ]
                },
                {
                  element: 'div',
                  classList: ['col-9'],
                  children: [
                    {
                      element: 'div',
                      classList: ['card-body'],
                      children: [
                        {
                          element: "h3",
                          textContent: data.name,
                          classList: ['card-title']
                        },
                        {
                          element: "p",
                          textContent: data.weather[0].description,
                          classList: ['card-text']
                        }
                      ]
                    }

                  ]
                }
              ]
            }
          ]
        }
      ]
    });
    formSection.insertAdjacentElement("afterend", display);
  },
  modifyDocument: () => {
    dom.applyButtonEventListener();
  },
};

export default dom;
