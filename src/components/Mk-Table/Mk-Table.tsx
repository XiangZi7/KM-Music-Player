import {PlayCircle} from "react-feather";
import {Avatar} from "antd";

export default function MkTable({data}) {
    return (
        <>
            <ul>
                <li className="adobe-product">
                    <div className="products">
                        <Avatar shape="square"
                                src="http://p1.music.126.net/ciXQIDgThBtsJO_bV_35Nw==/109951163141677343.jpg"/>
                        <span className="ml-5">yxcr</span>
                    </div>
                    <span className="status">Updated</span>
                    <span className="status">Updated</span>
                    <div className="button-wrapper">
                        <div className="flex items-center">
                            <PlayCircle/>
                        </div>
                    </div>
                </li>

            </ul>
        </>
    )
}