import TabComponent from "../../types/TabComponent";

export default interface TabNavItem
{
	id: string;
	label: string;
	component: TabComponent;
	closable: boolean;
}