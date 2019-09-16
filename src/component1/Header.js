import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMediumM, faGithub } from '@fortawesome/fontawesome-free-brands'

export default () => (
  <header style={{
    backgroundColor: 'blue',
    display: 'flex',
    justifyContent: 'space-between',
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%'
  }}>
    <a
      href='https://medium.com/p/cc96430eaece'
      title='Medium Article'
      className={'small-button medium'}
    >
      <FontAwesomeIcon icon={faMediumM} size='3x' color='#fff' />
    </a>
    <a
      href='https://github.com/funador/react-image-upload'
      title='Github repo'
      className={'small-button github'}
    >
      <FontAwesomeIcon icon={faGithub} size='3x' color='#fff' />
    </a>
  </header>
)