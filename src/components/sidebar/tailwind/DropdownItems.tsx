import { DropdownItem, DropdownDivider, DropdownLabel } from "@/components/ui/dropdown";
import { Avatar } from "@/components/ui/avatar";

interface DropdownItemType {
    href?: string;
    icon?: any;
    label?: string;
    isDivider?: boolean;
    avatar?: {
        src?: string;
        initials?: string;
        className?: string;
    };
}

export function DropdownItems({ items }: { items: DropdownItemType[] }) {
    return (
        <>
            {items.map((item, index) => {
                if (item.isDivider) {
                    return <DropdownDivider key={`divider-${index}`} />;
                }
                return (
                    <DropdownItem key={item.href} href={item.href}>
                        {item.icon && <item.icon />}
                        {item.avatar && (
                            <Avatar
                                slot="icon"
                                src={item.avatar.src}
                                initials={item.avatar.initials}
                                className={item.avatar.className}
                            />
                        )}
                        <DropdownLabel>{item.label}</DropdownLabel>
                    </DropdownItem>
                );
            })}
        </>
    );
} 