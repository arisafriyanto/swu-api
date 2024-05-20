<h1 align="center">SWU API</h1>

SWU API provides access to important information for STMIK Widya Utama Purwokerto students. With this API, students can retrieve data such as current class schedules, Grade Point Average (GPA) values, course grade details, and information about campus locations.

This API is designed for easy access and integration with STMIK Widya Utama Purwokerto's internal systems as well as third-party applications that can improve students' academic experience. By using this API, users can quickly and easily access the information they need without having to go through time-consuming manual processes.

> Base url of this service is: http://localhost:8080

## How to Install

#### 1. Clone repository with the following command:
   
   ```bash
   git clone https://github.com/arisafriyanto/swu-api.git
   ```
    
#### 2. Move to the repository directory with the command:
   
   ```bash
   cd swu-api
   ```

#### 3. Run the following command to install the depedency:

   ```bash
   npm install
   ```

#### 4. Copy the `.env.example` file, rename it to `.env` and edit the `.env` file in the main directory, making sure the configuration values are appropriate:

   ```bash
    PORT=8080
    ENCRYPT_KEY=YOUR_ENCRYPT_KEY
    DB_HOST=YOUR_DB_HOST
    DB_USER=YOUR_DB_USER
    DB_PASSWORD=YOUR_DB_PASSWORD
    DB_NAME=YOUR_DB_NAME
   ```
  
#### 5. Start the API:

   ```bash
   npm run start
   ```

   or

   ```bash
   npm run dev
   ```
   <br>
  
## Documentation

This API uses Postman to documentation and test.

You can download the Postman documentation [Postman Collection](https://documenter.getpostman.com/view/33657932/2sA3JGfjHi)

## Contact

For any inquiries or support, please contact the SWU API development team at [arisapriyanto.new@gmail.com](mailto:arisapriyanto.new@gmail.com).
#### Thank you for using SWU API!!
