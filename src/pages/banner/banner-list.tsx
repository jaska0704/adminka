import { Button, Image, Pagination, Popconfirm, Spin, Table, TableProps } from "antd";
import { useGetBannerList } from "./service/query/useGetBannerList"
import { useNavigate } from "react-router-dom";


const BannerList = () => {
    const {data, isLoading} = useGetBannerList();
    const navigate = useNavigate()
    console.log(data);

    const remove =(id:number)=>{

    }
   
interface DataType {
  id: number
  title: string
  image: string
  key: number
}

 const dataCategory = data?.map((item) => ({
   id: item.id,
   title: item.title,
   image: item.image,
   key: item.id,
   
 }));

 const columns: TableProps<DataType>["columns"] = [
   {
     title: "Id",
     dataIndex: "key",
     key: "key",
   },
   {
     title: "Image",
     dataIndex: "image",
     key: "image",
     render: (data: string) => {
       return <Image width={100} src={data} />;
     },
   },
   {
     title: "Title",
     dataIndex: "title",
     key: "title",
   },
   {
     title: "Tags",
     key: "tags",
     dataIndex: "tags",
     render: (_, data) => (
       <div style={{ display: "flex", gap: "15px" }}>
         <Popconfirm
           onConfirm={() => remove(Number(data.id))}
           title={"Are you delete Sub Category?"}
         >
           <Button>Delet</Button>
         </Popconfirm>
         <Button onClick={() => navigate(`/home/banner-edit/${data.id}`)}>
           Edit
         </Button>
       </div>
     ),
   },
 ];

 return isLoading ?  (
   <Spin />
 ) : (
   <div>
     <div style={{ paddingBottom: "20px" }}>
       <Button
         onClick={() => navigate("/home/banner-create")}
         type="primary"
       >
         Create
       </Button>
     </div>
     <Table
       dataSource={dataCategory}
       style={{ height: "68vh", overflow: "auto" }}
       columns={columns}
     />
     {/* <Pagination
       total={data?.pagesSize}
       onChange={(sizes) => setPages((sizes - 1) * 5)}
       pageSize={5}
       defaultCurrent={1}
       style={{
         padding: "5px",
         backgroundColor: "#d6b5d6",
         width: "100%",
         borderBottomRightRadius: "15px",
         borderBottomLeftRadius: "15px",
       }}
     /> */}
   </div>
 );
}

export default BannerList