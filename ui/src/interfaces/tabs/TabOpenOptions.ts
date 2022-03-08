import TabCustomData from "./TabCustomData";

export default interface TabOpenOptions
{
	label: string;
	component: string;
	data?: TabCustomData;
}