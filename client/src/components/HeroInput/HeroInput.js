import React from 'react'

import classes from './HeroInput.css'

const HeroInput = (props) => {

  const notref = React.createRef();

  return (
    <div className={classes.HeroInput}>
      <input
            type='text'
            className={classes.HeroInput__input}
            placeholder={props.placeholder}
            onChange={() => props.change(notref.current.value)}
            value={props.value}
            ref={notref}
          />
          <label
            className={classes.HeroInput__label}>{props.label}</label>
    </div>
  )
}

export default HeroInput
