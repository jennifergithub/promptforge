import React from 'react';
import { Pivot, PivotItem } from '@fluentui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const Nav: React.FC = () => {
  const { language, setLanguage } = useLanguage(); // Access context
  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (item?: PivotItem) => {
    if (item) {
      switch (item.props.headerText) {
        case 'Secure Prompts':
          navigate(`/secure-prompts/${language}`); // Use the language from context
          break;
        case 'Output Safety':
          navigate(`/output-safety/${language}`);
          break;
        case 'Guides':
          navigate('/guides');
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="nav-bar">
      <Pivot
      aria-label="Nav bar"
      selectedKey={location.pathname}
      onLinkClick={handleLinkClick}
    >
      <PivotItem headerText="Secure Prompts" itemKey={`/secure-prompts/${language}`} />
      <PivotItem headerText="Output Safety" itemKey={`/output-safety/${language}`}/>
      <PivotItem headerText="Guides" itemKey="/guides" />
    </Pivot>
    </div>
    
  );
};

export default Nav;