import SearchResult from ".";

export default interface PersonResult extends SearchResult
{
	firstName: string;
	lastName: string;
}