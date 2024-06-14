import logo from "../../assets/images/lion.jpeg";

const Footer = () => {
    return (
        <div className="w-[100%] bottom-0">
            <div className="flex h-[9vh] justify-center items-center p-[20px] bg-black">
                <img className="w-[30px] h-[30px] mr-[10px] rounded-full" src={logo} alt="logo"></img>
                <span className="text-[16px] font-medium">SNULION 2024</span>
            </div>
        </div>
    )
}

export default Footer;
