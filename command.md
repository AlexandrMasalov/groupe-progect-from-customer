npx sequelize-cli model:generate --name Client --attributes name:string,lastName:string,surName:string,adress:string 
npx sequelize-cli model:generate --name Comment --attributes author:string,body:string,client_id:string,order_id:string
npx sequelize-cli model:generate --name Order --attributes number:string,furniture_id:string,client_id:string,delivery_id:string,assembly_id:string
npx sequelize-cli model:generate --name Delivery --attributes data:string,groupDelivery_id:string,statusDelivery:string
npx sequelize-cli model:generate --name Assembly --attributes data:string,groupAssembly_id:string,statusAssembly:string
npx sequelize-cli model:generate --name GroupDelivery --attributes data:string,user_id:string
npx sequelize-cli model:generate --name GroupAssembly --attributes data:string,user_id:string
npx sequelize-cli model:generate --name User --attributes name:string,password:string
npx sequelize-cli model:generate --name Furniture --attributes type:string,price:string
npx sequelize-cli model:generate --name Status --attributes type:string


npx sequelize-cli seed:generate --name User
npx sequelize-cli seed:generate --name Furniture
npx sequelize-cli seed:generate --name Client
npx sequelize-cli seed:generate --name Status







npx sequelize-cli db:seed:all
