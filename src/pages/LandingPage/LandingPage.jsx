import React from 'react'
import { Container, Header } from 'semantic-ui-react'

const LandingPage = () => {
    return (
        <Container textAlign="center">
            <Header size="huge" style={{
                fontSize: "4em"
            }}>Welcome to <span style={{
                backgroundColor:'#6435c9',
                color:'white',
                padding:'0 0.5rem',
                marginRight:'0.2rem',
                borderRadius: '0.3rem'
            }}>T</span>eebay</Header>            
        </Container>
    )
}

export default LandingPage
