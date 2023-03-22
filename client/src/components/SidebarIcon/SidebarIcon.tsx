import classNames from 'classnames';

import './SidebarIcon.scss';

interface SidebarIconProps {
  imgUrl: string;
  className?: string;
  tooltip?: string;
  name?: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const SidebarIcon = ({
  name,
  imgUrl,
  active,
  className,
  disabled,
  tooltip,
  onClick,
}: SidebarIconProps) => {
  return (
    <div
      className={classNames('sidebar-icon', className, {
        'sidebar-icon--active': active,
        'sidebar-icon--disabled': disabled,
      })}
      onClick={() => onClick && onClick()}
      data-tooltip={tooltip}
    >
      <img src={imgUrl} alt={name || 'sidebar icon'} />
    </div>
  );
};

export { SidebarIcon };
