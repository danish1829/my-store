import { Link } from "react-router-dom";

const ClothingCard = ({ data }) => {
    const { images, _id } = data || {}

    return (
      <div className="w-full max-w-[250px] mx-auto hover:shadow-lg transition duration-300 bg-white rounded-lg overflow-hidden">
        {/* Image */}
        <Link to={'/cloth/view/'+ _id}><div className="overflow-hidden">
          <img
            src={images}
            alt="cart"
            className="w-full h-[300px] object-cover transform hover:scale-105 transition duration-500"
          />
        </div></Link>
  
        {/* Title + Price */}
        <div className="p-3 text-center">
          <a href="#" className="block text-blue-600 hover:underline font-medium">
            {data?.title}
          </a>
          <p className="text-gray-800 font-semibold">₹ {Number(data?.price).toLocaleString()}</p>
        </div>
      </div>
    );
  };
  
  export default ClothingCard;
  