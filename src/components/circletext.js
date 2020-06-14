import React from 'react';

const CenterAll = (props) => {
  
  return(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} >
      { props.children }
    </div>
  )
}

const Circle = (props) => {

  return(
    <div style={{ width: '200px', height: '200px', borderRadius: '100px', backgroundColor: 'hsl(224, 70%, 45%)' }} >
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
      {props.text}
      </div>
    </div>
  )
}

export { Circle, CenterAll }
