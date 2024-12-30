import { Container, Row, Col } from "react-bootstrap";
import PieChart from "./PieChart";

const Home = () => {
    return(
        <Container>
            <Row>
                <Col>
                    <h1>Resumen general de gastos</h1>
                    <PieChart/>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;