export const Board = ({ title, issues }) => {
  return (
    <>
      <h1>{title}</h1>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>{issue.title}</li>
        ))}
      </ul>
    </>
  )
}
