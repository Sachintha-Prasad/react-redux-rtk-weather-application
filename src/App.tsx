import { Col, Layout } from "antd"
import React from "react"
import WeatherComponent from "./features/weather/WeatherComponent"

const App = () => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Col
                xs={{ span: 20, offset: 2 }}
                sm={{ span: 16, offset: 4 }}
                lg={{ span: 12, offset: 6 }}
                xl={{ span: 8, offset: 8 }}
            >
                <WeatherComponent />
            </Col>
        </Layout>
    )
}

export default App
