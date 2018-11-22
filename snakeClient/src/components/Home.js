import React from 'react';
import NavBar from './NavBar';

const divStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center'
};


const Home = () => {

  if (window.innerWidth <= 500) {
    return (
      <div>
        <NavBar />
      </div>
    )
  }
  return (
    <div style={divStyle}>
      <NavBar />
    </div>

  )

}



/*Hello.propTypes = {
 onClick: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired

}*/

export default Home;
