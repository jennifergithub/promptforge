import React from 'react';
import { Pivot, PivotItem } from '@fluentui/react';
import { useNavigate, useLocation } from 'react-router-dom';

const Nav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (item?: PivotItem) => {
    if (item) {
      switch (item.props.headerText) {
        case 'How To':
          navigate('/how-to/');
          break;
        case 'Secure Prompts':
          navigate(`/secure-prompts/`);
          break;
        case 'Output Safety':
          navigate(`/output-safety/`);
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
      <PivotItem headerText="How To" itemKey="/how-to" />
      
      <PivotItem headerText="Secure Prompts" itemKey={`/secure-prompts/`} />
      <PivotItem headerText="Output Safety" itemKey={`/output-safety/`}/>
      </Pivot>
    </div>
    
  );
};

export default Nav;