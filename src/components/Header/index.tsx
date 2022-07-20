import "./index.css";

interface IProps {
  title?: string;
}

function Header({ title }: IProps) {
  if (!title) {
    title = "Student Comments";
  }
  return (
    <header>
      <h1>
        <img src="logo.png" height={22} alt={title} />
        <a href="#/">{title}</a>
      </h1>
      <nav>
        <ul>
          <li>
            <a href="#/">Home</a>
          </li>
          <li>|</li>
          <li>
            <a href="#/classes">My Classes</a>
          </li>
          <li>|</li>
          <li>
            <a href="#/comments">My Comments</a>
          </li>
          <li>|</li>
          <li>
            <a href="#/settings">Settings</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
