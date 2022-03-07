export default interface Report
{
	id: number;
	created: number;
	type: "incident" | "arrest" | "citation" | "warrant";
	title: string;
	summary: string;
}