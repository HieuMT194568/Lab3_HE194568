import React from "react";
import { products } from "../datas/products";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../components/Header";

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keywords = searchParams.get("keywords") || "";
  const sort = searchParams.get("sort") || "none";
  const categories = ['Tất cả', ...new Set(products.map(p => p.category))];
  const category = searchParams.get("Tất cả") || "none";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = 3;
  //lọc theo keywords
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(keywords.toLowerCase()),
  );
  //lóc theo cate
  var cateProducts= [...filteredProducts]; if (category === 'Tất cả'){} else  cateProducts = filteredProducts.filter((product) =>
    product.category.toLowerCase().includes(category.toLowerCase()),
  );;
 

  // sắp xếp theo giá
  const sortedProducts = [...cateProducts];
  if (sort === "price-asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  //tính tổng số trang
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  //nếu URL yêu cầu trong lớn hơn tổng số trang
  //thì sử dụng trang cuối cùng hợp lệ
  const currentPage = Math.min(page, totalPages);
  //Lấy sản phẩm của trang hiện
  //trang 1: (1-1) *3 = 0
  //trang2: (2-1)*3 = 3
  //trang3 : (3-1) *3 = 6
  const startIndex = (currentPage - 1) * pageSize;
  //slice() lấy các sản phẩm từ startIndex
  //đến trước vị trí của startIndex + pageSize
  const displayProducts = sortedProducts.slice(
    startIndex,
    startIndex + pageSize,
  );
  //hàm cập nhật các tham số thay đổi của URL
  function updateParams(changes) {
    const nextParams = new URLSearchParams(searchParams);
    //duyệt qua từng tham số
    Object.entries(changes).forEach(([key, value]) => {
      //nếu giá trị rỗng hoặc giá trị mặc định
      if (value === "" || value === null || value === "none") {
        //xóa tham số khỏi URL
        nextParams.delete(key);
      } else {
        //chuyển giá trị thành chuỗi rồi cập nhật URL
        nextParams.set(key, String(value));
      }
    });
    //cập nhật lại URL và làm react render lại theo các tham số mới
    setSearchParams(nextParams);
  }
  //hàm chuyển trang
  function goToPage(newPage) {
    //chỉ thay đổi page,giữ nguyên keyword và sort
    updateParams({ page: newPage });
  }
  function handleKeywordChange(event) {
    //lấy nội dung người dùng vừa nhập
    //cập nhật keyword và quay về trang 1
    updateParams({
      keywords: event.target.value,
      page: 1,
    });
  }
  function handleSortChange(event) {
    updateParams({
      sort: event.target.value,
      page: 1,
    });
  }
  function handleCategory(event) {
    updateParams({
      sort: event.target.value,
      page: 1,
    });
  }
  return (
    <div >
     <Header></Header> 
     <div  style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        
        margin: "0 auto",
        padding: "20px 30px",
        borderBottom: "1px solid #ccc",
      }} className="justify-content-center" >
    
      <div>
        <label>
          Tìm kiếm:{" "}
          <input
            type="text"
            value={keywords}
            placeholder="Nhập tên cần tìm"
            onChange={handleKeywordChange}
          />
        </label>
      </div>
      <div>
        <label>
          Sắp xếp:{" "}
          <select value={sort} onChange={handleSortChange}>
            <option value="none">Mặc định</option>
            <option value="price-asc">SX tăng dần</option>
            <option value="price-desc">SX giảm dần</option>
          </select>
        </label>
      </div>
       <div>
        <label>
          Danh mục:{""}
          <select value={category} onChange={handleCategory}>
              {categories.map((categories) => (
            <option value={categories}>{categories}      </option>
          ))}
          </select>
        </label>
      </div>
          </div>
      {/* Giao diện phân trang */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        
        margin: "0 auto",
        padding: "20px 30px",
        borderBottom: "1px solid #ccc",}} >
            <p>
        Tổng {totalPages} | Trang: {currentPage}/{totalPages}
      </p>
        <button
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          previous
        </button>{" "}
        {/* tạo ra các nút trang từ 1 đến totalPage */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              disabled={pageNumber === currentPage}
              onClick={() => goToPage(pageNumber)}
            >
              {pageNumber}
            </button>
          ),
        )}{" "}
        <button
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          next
        </button>
      </div>
      

      {displayProducts.length === 0 ? (
        <p>Không tìm thấy sản phầm</p>
      ) : (
        <div className="d-flex" >
        <table className="  align-items-center justify-content-center " border={1} >
            <thead><tr><th>Id</th><th>Tên sản phẩm</th><th>Danh mục</th><th>Giá</th><th>Thao tác</th></tr></thead>
        <tbody>
          {displayProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price.toLocaleString("vi-VN")} đ</td>
              <td>
                <Link to={`/products/${product.id}`}>Xem chi tiết</Link>
              </td>
            </tr>
          ))}
        </tbody>
     </table></div>
      )}
      
    </div>
  );
}

export default ProductList;
