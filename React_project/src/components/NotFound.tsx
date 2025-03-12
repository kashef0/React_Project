const NotFound = () => {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-4xl font-bold text-red-500">404</h1>
          <p className="mt-2 text-xl text-gray-700">Sidan hittades inte</p>
          <p className="mt-4 text-gray-500">
            Vi kunde inte hitta sidan du letade efter.
          </p>
        </div>
      </div>
    );
  };
  
  export default NotFound;
  