console.log('Started Client Side JS')

const weatherForm = document.getElementById('weatherForm')
const searchInput = document.getElementById('searchInput')
const messageOne = document.getElementById('message-1')

const elementMapper = (respData) => {

    messageOne.textContent = 'Loading...'
    let ulLIst = ''
    

    if ( respData.error) {
        messageOne.textContent =  respData.error
    } else {
        messageOne.textContent = respData.foreCastData.cityName
        ulLIst += '</h3><ul style="list-style-type:none;">'
        Object.entries(respData.foreCastData.forecast).map((value) => {
            ulLIst += '<li> '+value[0]+'</li><ul style="list-style-type:none;">'
            
            value[1].map((info) => {
                ulLIst += '<li>Ωρα '+info.time+ ' ' +info.weatherDescr+ ' θερμοκρασία '+ info.temp +' <span>&#8451;</span>'  
            })
            
            ulLIst += '</ul>'

        })
        ulLIst += '</ul>'

    }
    
    document.querySelector(".resultDiv").innerHTML = ulLIst
}


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const locationInput = searchInput.value

    fetch(window.location+'weather?address='+locationInput).then((response) => {
        response.json().then((data) => {

            elementMapper(data)

        })
        
    })
})


