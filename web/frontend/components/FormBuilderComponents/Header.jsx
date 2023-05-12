import { RichTextEditor } from './utils/RichTextEditor';

const Header = ({ headerObject }) => {
  const { title, description } = headerObject;

  return (
    <div className="header-section">
      <div className="form-header">
        <div>
          <div className="form-builder-title">Title</div>
          <RichTextEditor
            rte_val={title}
            section="header"
            section_key="title"
            className="form-builder-input-header-title"
          />
        </div>
        <div>
          <div className="form-builder-title">Content</div>
          <RichTextEditor
            rte_val={description}
            section="header"
            section_key="description"
            className="form-builder-input-header-title"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
