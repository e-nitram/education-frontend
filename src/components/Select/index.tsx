import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';
import Select, {
  components,
  ControlProps,
  Props,
  StylesConfig,
} from 'react-select';

import factorialSvg from '@/assets/icons/factorial.svg';
import lockSvg from '@/assets/icons/lock.svg';
import { primary } from '@/theme';
import { OptionType } from '@/typings';

import styles from './index.module.css';

const { lock } = styles;
interface IProps {
  onSelect: (props: { value: string; label: string }) => void;
  result_identifier?: () => void;
  placeholder: string;
  schoolid?: string;
  options: OptionType[];
  container?: boolean;
  selected?: boolean;
  isInvalid?: boolean;
  isLocked?: boolean;
  hideChevron?: boolean;
  isWhiteG?: boolean;
  h?: string;
  square?: boolean;
  style?: StylesConfig;
  isSearchable?: boolean;
  showQuestionInOptions?: boolean;
  handleInputChange?: (val: string) => void | undefined;
  variant?: 'primary' | 'dark' | 'stormcloud';
  border?: string | undefined;
  bg?: string;
  selectedOptions?: {
    readonly title: string;
  };
  icon?: string & { src: string };
}

interface CustomSelectProps extends Props<any> {
  emoji?: React.ReactNode | undefined;
  onEmojiClick: () => void;
  isLocked?: boolean;
}

const Control = ({ children, ...props }: ControlProps) => {
  const {
    emoji,
    onEmojiClick,
    isLocked = false,
  } = props.selectProps as CustomSelectProps;
  const style = { cursor: 'pointer' };
  return (
    <components.Control {...props}>
      {isLocked ? (
        <Box
          className={lock}
          style={{ top: '0', display: 'flex', justifyContent: 'center' }}
        >
          <Image src={lockSvg} alt='lock-icon' />
        </Box>
      ) : (
        ''
      )}
      {emoji !== undefined && (
        <span onMouseDown={onEmojiClick} style={style}>
          {emoji}{' '}
        </span>
      )}
      {children}
      {/* </>
    } */}
    </components.Control>
  );
};

const CustomSelect: FC<IProps> = (props: IProps) => {
  const {
    icon,
    options,
    onSelect,
    selectedOptions,
    placeholder,
    isInvalid = false,
    isSearchable = false,
    handleInputChange,
    showQuestionInOptions = true,
    h,
    isLocked,
    variant = 'primary',
    border,
    bg,
    square = false,
    hideChevron = false,
    isWhiteG = false,
  } = props;
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [, setValue] = useState('');
  const [selectedOption, setSelectedOption] = useState({ label: placeholder });

  useEffect(() => {
    if (
      selectedOptions?.title !== undefined &&
      selectedOptions?.title?.trim()?.length > 0
    ) {
      setSelectedOption({
        label: selectedOptions?.title,
      });
    }
  }, [selectedOptions]);

  useEffect(() => {
    const updatedOptions = options?.map((option): OptionType => {
      return {
        ...option,
        label: option.title !== undefined ? option.title : option.label,
        value: option?.value ?? option?.title,
        isDisabled: false,
      };
    });
    if (showQuestionInOptions && updatedOptions.length > 0) {
      updatedOptions.unshift({
        label: placeholder,
        value: '',
        isDisabled: true,
      });
    }
    setFilteredOptions(updatedOptions);
  }, [options, placeholder, showQuestionInOptions]);

  const onInputChange = (e: any) => {
    if (handleInputChange) handleInputChange(e);
  };

  const selectHandler = (props: { label: string; value: string }) => {
    // setSelectedOption(props)
    onSelect(props);
  };

  const styles: StylesConfig = {
    valueContainer: (provided: any) => ({
      ...provided,
      alignItems: 'center',
      padding: '2px 2px 2px 10px !important',
      color: primary.colors.ED[variant],
      ':active': {
        border: 'none !important',
      },
    }),
    control: (provided: any) => ({
      ...provided,
      width: '100%',
      borderRadius: square ? '8px' : '100px',
      minHeight: 'inherit !important',
      height: h ?? '52px !important',
      border: isInvalid
        ? `1px solid  ${primary.colors.ED.danger}`
        : border !== undefined
          ? `1px solid ${border} !important`
          : 'none',
      backgroundColor: bg ?? primary.colors.ED.light,
      fontSize: '16px',
      lineHeight: '26px',
      fontWeight: '500',
      fontFamily: primary.fonts.ED.primary,
      paddingLeft: variant == 'primary' ? '1rem' : '4px',
      paddingRight: '0.5rem',
      cursor: 'pointer',
      ':focus': {
        outline: 'none !important',
        boxShadow: 'none !important',
        borderColor: 'none !important',
      },
      ':hover': {
        outline: 'none !important',
        boxShadow: 'none !important',
        borderColor: `${
          isInvalid ? primary.colors.ED.danger : 'none'
        } !important`,
      },
    }),
    input: (styles: any) => ({
      ...styles,
    }),
    placeholder: (styles: any) => ({
      ...styles,
      color: isInvalid
        ? primary.colors.ED.danger
        : isWhiteG
          ? primary.colors.ED.stormcloud
          : primary.colors.ED[variant],
      fontSize: '16px',
      lineHeight: '26px',
      fontWeight: isWhiteG ? '400' : '500',
      fontFamily: primary.fonts.ED.primary,
      marginLeft: '0px',
      marginRight: '0px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: isInvalid ? primary.colors.ED.danger : primary.colors.ED[variant],
      fontSize: '16px',
      lineHeight: '26px',
      fontWeight: isWhiteG ? '400' : '500',
      fontFamily: primary.fonts.ED.primary,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      ':hover': {
        border: 'none !important',
      },
    }),
    option: (styles: any, state) => ({
      ...styles,
      backgroundColor: primary.colors.ED.light,
      color:
        state.isFocused || state.isSelected
          ? primary.colors.ED.primary
          : primary.colors.ED.dark,
      fontSize: '16px',
      lineHeight: '26px',
      textAlign: 'start',
      fontWeight: '500',
      fontFamily: primary.fonts.ED.primary,
      cursor: 'pointer',
      ':hover': {
        // background:primary.colors.ED.primary,
        color: primary.colors.ED.primary,
        backgroundColor: primary.colors.ED.light,
      },
    }),
    dropdownIndicator: (styles: any) => ({
      ...styles,
      color: isInvalid ? primary.colors.ED.danger : primary.colors.ED[variant],
      ':hover': {
        color: isInvalid
          ? primary.colors.ED.danger
          : primary.colors.ED[variant],
      },
    }),
    menuList: (styles: any) => ({
      ...styles,
    }),
  };

  const customProps = {
    ...(icon !== undefined && {
      emoji:
        icon != undefined ? (
          <Image
            src={isInvalid ? factorialSvg : icon}
            alt='icon'
            className='h-auto w-auto'
          />
        ) : undefined,
    }),
  };
  return (
    <>
      <Select
        {...customProps}
        {...props}
        data-testid='custom-select'
        id='custom-react-select'
        components={{
          Control,
          IndicatorSeparator: null,
          ...(hideChevron ? { DropdownIndicator: (_props) => null } : ''),
        }}
        isDisabled={isLocked}
        placeholder={placeholder}
        onChange={(props: any) => selectHandler(props)}
        onInputChange={(val) => {
          onInputChange(val);
          setValue(val);
        }}
        value={selectedOption}
        name='emoji'
        isSearchable={isSearchable}
        options={filteredOptions}
        styles={styles}
      />
    </>
  );
};

export default CustomSelect;
