import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import Header from '../components/Header'
import { products } from '../datas/products'
import 'bootstrap/dist/css/bootstrap.min.css'
function ProductDetail() {
  const { productID } = useParams();
  const product = products.find((p) => p.id === Number(productID));

  return (<>
    <Header></Header>

    <Container className="my-4 text-start">
      {product ? (
        <Row className="g-4">
          {/* Khung ảnh sản phẩm (để trống) */}
          <Col md={5}>
            <div
              className="border rounded d-flex align-items-center justify-content-center text-muted"
              style={{ height: "300px" }}
            >
              Ảnh sản phẩm
            </div>
          </Col>
          <Col md={7}>
            <Card>
              <Card.Body>
                <Card.Title as="h2">{product.name}</Card.Title>
                <Card.Text>Danh mục: {product.category}</Card.Text>
                <Card.Text className="fw-bold text-danger">
                  Giá: {product.price.toLocaleString("vi-VN")} đ
                </Card.Text>
                <Card.Text>{product.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <p>Không tìm thấy sản phẩm</p>
      )}
      <Button as={Link} to='/product'   >
        Quay lại danh sách
      </Button>
    </Container>
</>
  )
}

export default ProductDetail
