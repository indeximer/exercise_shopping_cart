import React, { Component } from 'react'
class ErrorBoundary extends Component {

    state = { hasError: false }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true }
    }
  
    componentDidCatch(error, info) {
      // You can also log the error to an error reporting service
        this.setState({hasError:true})
        console.log('error boundary')
        console.log(error)
        console.log(info)
    }
  
    render() {
      if (this.state.hasError) {
        return <h1 className="text-center">Ocorreu um erro inesperado. <br />Tente novamente mais tarde.</h1>
      }
  
      return this.props.children; 
    }
  }
  export default ErrorBoundary