import Report from ".";

export default interface Warrant extends Report
{
	type: "warrant";
	active: boolean;
}