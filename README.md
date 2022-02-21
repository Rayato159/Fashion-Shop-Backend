<h1>Fashion Shop E-commerce Backend Assignment</h1>

<h2>Introduce</h2>
<ul>
  <li><strong>จัดทำโดย</strong></li>
    <p>เรืองยศ หนานเจียง</p>
  <li><strong>วัตถุประสงค์</strong></li>
    <p>เพื่อเข้ารับการทดสอบสมัครงาน ทีม Software ตำแหน่ง Backend Dev ของบริษัท iCreativeSystems</p>
</ul>

<h2>Entity Diagram</h2>
<ul>
    <li><a href="https://drive.google.com/file/d/1Y8s6K7vpvOqWSF-3KSF295Prbhw4CDgx/view?usp=sharing">Click Here!</a></li>
</ul>

<h2>Tools</h2>
<ul>
  <li><strong>NestJs Framework</strong></li>
  <li><strong>PostgresSQL</strong></li>
  <li><strong>Docker 🐳</strong></li>
</ul>

<h2>Objective ที่สามารถทำได้</h2>
  <ul>
  <li>Product-lists</li>

  ```
  - สามารถ Filter ได้ด้วย Gender, Category และ Size
  - สามารถแสดงสินค้าแต่ละหน้า (Page Index) ตามจำนวนที่ต้องการแสดงแต่ละหน้าได้
  ```

  <li>Create Order</li>

  ```
  - บันทึกที่อยู่จัดส่งสินค้าได้
  - สามารถแสดงสินค้าแต่ละหน้า (Page Index) ตามจำนวนที่ต้องการแสดงแต่ละหน้าได้
  ```

  <li>Payment</li>

  ```
  - บันทึกวันที่ชำระเงิน (ไม่แน่ใจ เพราะผมใช้เป็นสร้างวันที่อัตโนมัติไปเลยครับ)
  - บันทึกจำนวนเงิน
  - บันทึกธนาคาร
  - รูปภาพใบเสร็จ (URL หรือ Upload File)
  ```

  <li>Order List แสดงรายการคำสั่งซื้อสำหรับ Admin</li>

  ```
  - สามารถ Filter ได้ด้วย ช่วงวันที่ของคำสั่งซื้อที่ชำระเงินแล้ว (Paid Date : Start - End)
  - สามารถ Filter คำสั่งซื้อด้วยสถานะของคำสั่งซื้อได้ (purchased หรือ waiting)
  - สามารถแสดงคำสั่งซื้อแต่ละหน้า (Page Index) ตามจำนวนที่ต้องการแสดงแต่ละหน้าได้
  ```

  </ul>

<h2>Objective ที่ไม่สามารถทำได้</h2>

  ```
  - Request แบบทีละ 10, 20, 50 หน่วย
  - บันทึกจำนวน ของแต่ละสินค้า

  ทั้งนี้ทั้งนั้นผมจะนำไปปรับปรุงแก้ไขต่อไปเพื่อการเป็นนักพัฒนาที่ดีขึ้นในอนาคตครับ
  ```

<h2>Setup Project</h2>
  <p>Clone project</p>

  ```
  git clone https://github.com/Rayato159/Fashion-Shop-Backend.git
  ```

  <p>Start project with docker 🐳</p>

  ```
  cd ./Fashion-Shop-Backend
  docker-compose up
  ```

<h2>Mock up data in json for API test</h2>
  <ul>
    <li><a href="https://github.com/Rayato159/Fashion-Shop-Backend/tree/main/mockup-data">Click Here!</a></li>
  </ul>

<h2>Postman collection and environment</h2>
  <ul>
    <li><a href="https://github.com/Rayato159/Fashion-Shop-Backend/tree/main/postman/364053b9-be57-41e1-8362-432158cbd2c5">Click Here!</a></li>
  </ul>

<h2>Data transfer object (Dto)</h2>
  <ul>
    <li><a href="https://github.com/Rayato159/Fashion-Shop-Backend/blob/main/src/users/dto/register.dto.ts">RegisterDto</a></li>
    <li><a href="https://github.com/Rayato159/Fashion-Shop-Backend/blob/main/src/gender/dto/create-gender.dto.ts">CreateGenderDto</a></li>
    <li><a href="https://github.com/Rayato159/Fashion-Shop-Backend/blob/main/src/size/dto/create-size.dto.ts">CreateSizeDto</a></li>
    <li><a href="https://github.com/Rayato159/Fashion-Shop-Backend/blob/main/src/plain-color/dto/create-plain-color.dto.ts">CreatePlainColorDto</a></li>
    <li><a href="https://github.com/Rayato159/Fashion-Shop-Backend/blob/main/src/pattern/dto/create-pattern.dto.ts">CreatePatternDto</a></li>
    <li><a href="https://github.com/Rayato159/Fashion-Shop-Backend/blob/main/src/orders/dto/create-order.dto.ts">CreateOrderDto</a></li>
    <li><a href="https://github.com/Rayato159/Fashion-Shop-Backend/blob/main/src/payments/dto/create-payment.dto.ts">CreatePaymentDto</a></li>
    <li><a href="https://github.com/Rayato159/Fashion-Shop-Backend/blob/main/src/payment-images/dto/create-payment-image.dto.ts">CreatePaymentDto</a></li>
  </ul>

<h2>ขั้นตอนการทำการทดสอบ API</h2>

```
***หากต้องการข้อมูล อยู่ที่ Mock up folder ครับ

1. ทำการ Register (สมารถใส่ role ได้ในขั้นตอนนี้)
2. ทำการ Login เพื่อรับ access token
3. ทำการ create ในส่วนของ gender, size, plain-color, pattern และ figure ให้เรียบร้อยก่อนที่จะ create products (ใช้ Data ใน Mockup แล้วยิง API ที่เป็นการ create แบบ array ขึ้นไป)
4. ทำการ create poducts (ใช้ Data ใน Mockup แล้วยิง API ที่เป็นการ create แบบ array ขึ้นไป)
5. ทำการ create cart (ทำการกดสร้างได้ทันที หาก login แล้ว)
6. ทำการ เพิ่ม หรือ ลด product ลงใน cart
7. ทำการ create payemnt
8. ทำการ upload หรือใส่ url ใน payment-images service
9. เป็นอันจบขั้นตอน
```

<h2>API lists</h2>
  <ul>
    <li><a href="#users">Users</a></li>
    <li><a href="#gender">Gender</a></li>
    <li><a href="#size">Size</a></li>
    <li><a href="#plain-color">Plain-color</a></li>
    <li><a href="#pattern">Pattern</a></li>
    <li><a href="#figure">Figure</a></li>
    <li><a href="#products">Products</a></li>
    <li><a href="#carts">Carts</a></li>
    <li><a href="#orders">Orders</a></li>
    <li><a href="#payments">Payments</a></li>
    <li><a href="#payment-images">Payment-images</a></li>
  </ul>

<h2 id="users">Users</h2>
  <ul>
    <li>Register</li>

  ```
  http://localhost:8080/register
  ```
  ```
  Method: POST
  Body:
    username: string
    password: string
    passwordConfirm: string
    role?: Role (admin or user)
  ```

  <li>Login</li>

  ```
  http://localhost:8080/login
  ```
  ```
  Method: POST
  Body:
    username: string
    password: string
  ```

  </ul>

  <h2 id="gender">Gender</h2>

  <ul>
    <li>Create gender</li>

  ```
  http://localhost:8080/gender/create
  ```
  ```
  Role: admin
  Method: POST
  Body:
    gender: string
    price_factor: number 
  ```

  <li>Create gender in array</li>

  ```
  http://localhost:8080/gender/create-mass
  ```
  ```
  Role: admin
  Method: POST
  Body:
    CreateGenderDto[]
  ```

  <li>Get gender</li>

  ```
  http://localhost:8080/gender
  ```
  ```
  Role: user
  Method: GET
  ```

  <li>Get gender by key</li>

  ```
  http://localhost:8080/gender/:gender
  ```
  ```
  Role: user
  Method: GET
  Param:
    gender: string (male or female)
  ```

  <li>Delete gender</li>

  ```
  http://localhost:8080/gender/:gender_id/delete
  ```
  ```
  Role: admin
  Method: DELETE
  Param:
    gender_id: string
  ```

  </ul>

  <h2 id="size">Size</h2>

  <ul>
    <li>Create size</li>

  ```
  http://localhost:8080/size/create
  ```
  ```
  Role: admin
  Method: POST
  Body:
    size: string
    price_factor: number 
  ```

  <li>Create size in array</li>

  ```
  http://localhost:8080/size/create-mass
  ```
  ```
  Role: admin
  Method: POST
  Body:
    CreateSizeDto[]
  ```

  <li>Get size</li>

  ```
  http://localhost:8080/size
  ```
  ```
  Role: user
  Method: GET
  Query:
    size: string
  ```

  <li>Get size by key</li>

  ```
  http://localhost:8080/size/:size
  ```
  ```
  Role: user
  Method: GET
  Param:
    size: string
  ```

  <li>Delete gender</li>

  ```
  http://localhost:8080/size/:size_id/delete
  ```
  ```
  Role: admin
  Method: DELETE
  Param:
    size_id: string
  ```

  </ul>

  <h2 id="plain-color">Plain-color</h2>

  <ul>
    <li>Create plain-color</li>

  ```
  http://localhost:8080/plain-color/create
  ```
  ```
  Role: admin
  Method: POST
  Body:
    color: string
    price_factor: number 
  ```

  <li>Create plain-color in array</li>

  ```
  http://localhost:8080/plain-color/create-mass
  ```
  ```
  Role: admin
  Method: POST
  Body:
    CreatePlainColorDto[]
  ```

  <li>Get plain-color</li>

  ```
  http://localhost:8080/plain-color
  ```
  ```
  Role: user
  Method: GET
  Query:
    color: string
    price: 'asc' or 'desc' (sort)
  ```

  <li>Get plain-color by key</li>

  ```
  http://localhost:8080/plain-color/:color
  ```
  ```
  Role: user
  Method: GET
  Param:
    color: string
  ```

  <li>Delete plain-color</li>

  ```
  http://localhost:8080/plain-color/:plain_color_id/delete
  ```
  ```
  Role: admin
  Method: DELETE
  Param:
    plain_color_id: string
  ```

  </ul>

  <h2 id="pattern">Pattern</h2>

  <ul>
    <li>Create pattern</li>

  ```
  http://localhost:8080/pattern/create
  ```
  ```
  Role: admin
  Method: POST
  Body:
    pattern: string
    price_factor: number 
  ```

  <li>Create pattern in array</li>

  ```
  http://localhost:8080/pattern/create-mass
  ```
  ```
  Role: admin
  Method: POST
  Body:
    CreatePatternDto[]
  ```

  <li>Get pattern</li>

  ```
  http://localhost:8080/pattern
  ```
  ```
  Role: user
  Method: GET
  Query:
    pattern: string
    price: 'asc' or 'desc' (sort)
  ```

  <li>Get pattern by key</li>

  ```
  http://localhost:8080/pattern/:pattern
  ```
  ```
  Role: user
  Method: GET
  Param:
    pattern: string
  ```

  <li>Delete pattern</li>

  ```
  http://localhost:8080/pattern/:pattern_id/delete
  ```
  ```
  Role: admin
  Method: DELETE
  Param:
    pattern_id: string
  ```

  </ul>

  <h2 id="figure">Figure</h2>

  <ul>
    <li>Create figure</li>

  ```
  http://localhost:8080/figure/create
  ```
  ```
  Role: admin
  Method: POST
  Body:
    figure: string
    price_factor: number 
  ```

  <li>Create figure in array</li>

  ```
  http://localhost:8080/figure/create-mass
  ```
  ```
  Role: admin
  Method: POST
  Body:
    CreateFigureDto[]
  ```

  <li>Get figure</li>

  ```
  http://localhost:8080/figure
  ```
  ```
  Role: user
  Method: GET
  Query:
    figure: string
    price: 'asc' or 'desc' (sort)
  ```

  <li>Get figure by key</li>

  ```
  http://localhost:8080/figure/:figure
  ```
  ```
  Role: user
  Method: GET
  Param:
    figure: string
  ```

  <li>Delete pattern</li>

  ```
  http://localhost:8080/figure/:figure_id/delete
  ```
  ```
  Role: admin
  Method: DELETE
  Param:
    figure_id: string
  ```

  </ul>

  <h2 id="products">Products</h2>

  <ul>
    <li>Create products</li>

  ```
  http://localhost:8080/products/create
  ```
  ```
  Role: admin
  Method: POST
  Body:
    color: string
    pattern: string
    figure: string
    size: string
    gender: string
    price: number (This is a base price)
  ```

  <li>Create figure in array</li>

  ```
  http://localhost:8080/products/create-mass
  ```
  ```
  Role: admin
  Method: POST
  Body:
    CreateProductDto[]
  ```

  <li>Get Products-lists</li>

  ```
  http://localhost:8080/product-lists
  ```
  ```
  Role: user
  Method: GET
  Query:
    gender: string
    color: string
    pattern: string
    figure: string
    size: string
    page: number
    limits: number
  ```

  <li>Get product by id</li>

  ```
  http://localhost:8080/products/:product_id
  ```
  ```
  Role: user
  Method: GET
  Param:
    product_id: string
  ```

  <li>Delete product</li>

  ```
  http://localhost:8080/products/:product_id/delete
  ```
  ```
  Role: admin
  Method: DELETE
  Param:
    product_id: string
  ```

  </ul>

  <h2 id="carts">Carts</h2>

  <ul>
    <li>Create cart</li>

  ```
  http://localhost:8080/carts/create
  ```
  ```
  Role: user (Need token!!!)
  Method: POST
  ```

  <li>Get cart by user</li>

  ```
  http://localhost:8080/carts/user-cart
  ```
  ```
  Role: user (Need token!!!)
  Method: GET
  ```

  <li>Add item into cart</li>

  ```
  http://localhost:8080/carts/add
  ```
  ```
  Role: user (Need token!!!)
  Method: PATCH
  Body:
    product_id: string
  ```

  <li>Remove item from cart</li>

  ```
  http://localhost:8080/carts/remove
  ```
  ```
  Role: user (Need token!!!)
  Method: PATCH
  Param:
    product_id: string
  ```

  

  </ul>

  <h2 id="orders">Orders</h2>

  <ul>
    <li>Create order</li>

  ```
  http://localhost:8080/create-order
  ```
  ```
  Role: user (Need token!!!)
  Method: POST
  Body:
    address: string
  ```

  <li>Get order-lists</li>

  ```
  http://localhost:8080/order-lists
  ```
  ```
  Role: admin
  Method: GET
  Query:
    status: Status (purchased or waiting)
    start: Date (start date in 'YYYY-MM-DD')
    end: Date (end date 'YYYY-MM-DD')
    limits: number
    page: number
  ```

  <li>Update order status</li>

  ```
  http://localhost:8080/orders/update-status/:order_id
  ```
  ```
  Role: admin
  Method: PATCH
  Param:
    order_id: string
  ```

  </ul>

  <h2 id="payments">Payments</h2>

  <ul>
    <li>Create payment</li>

  ```
  http://localhost:8080/payments/:order_id
  ```
  ```
  Role: user (Need token!!!)
  Method: POST
  Param:
    order_id: string
  Body:
    price: number
    bank: string
  ```
  </ul>

  <h2 id="payment-images">Payment-images</h2>

  <ul>
    <li>Upload payment-image</li>

  ```
  http://localhost:8080/payment-images/upload/:payment_id
  ```
  ```
  Role: user (Need token!!!)
  Method: POST
  Param:
    payment_id: string
  Body:
    image: FormData
  ```
  <li>Add URL for payment-image</li>

  ```
  http://localhost:8080/payment-images/url/:payment_id
  ```
  ```
  Role: user (Need token!!!)
  Method: POST
  Param:
    payment_id: string
  Body:
    url: string
  ```

  </ul>

  <h2>My Comment</h2>
  <p>ถ้าหากผมทำผิดพลาดประการใดต้องขออภัยด้วยครับ ผมจะนำทุกข้อผิดพลาดไปปรับปรุงต่อไปในอนาคต ขอบคุณที่ให้โอกาสผมได้ทดสอบครั้งนี้ด้วยครับ</p>
