import React from 'react'

function FullPageLoader(props) {
    const { loader } = props;
  return (
    loader && <div className="loader"><div className="loader-inner"></div></div>
  )
}

export default FullPageLoader;
