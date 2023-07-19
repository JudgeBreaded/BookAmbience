
let container = document.getElementsByClassName('container');
 

submitButton =  document.getElementById('submitButton').addEventListener((e)=>{
    fetch('https://api.spotify.com/v1/tracks/{cea4374e2f51431e939fcf199dbc271d}')
    .then(response => {
      return response.json();
    })
    
    .then(data => {
      console.log(data);
    })

    .catch(error => {
      console.error('Fetch error:', error);
    });
  



})

