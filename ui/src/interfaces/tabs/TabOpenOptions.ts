import TabComponent from "../../types/TabComponent";
import TabCustomData from "./TabCustomData";

export default interface TabOpenOptions
{
	label: string;
	component: TabComponent;
	data?: TabCustomData;
}