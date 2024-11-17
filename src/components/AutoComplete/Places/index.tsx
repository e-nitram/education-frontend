import Image from 'next/image';
import { FC, useCallback, useEffect, useState } from 'react';
import Select, {
  components,
  ControlProps,
  Props,
  StylesConfig,
} from 'react-select';

import factorialSvg from '@/assets/icons/factorial.svg';
import { getPlaceDetails, getPlacesSuggestions } from '@/services/googlePlaces';
import { primary } from '@/theme';

interface IProps {
  icon?: string & { src: string };
  variant?: 'primary' | 'dark';
  placeholder: string;
  isWhiteG?: boolean;
  invalid?: boolean;
  value: string;
  bg?: string;
  onSelectAddress: (address: string, zipCode: string) => void;
  style?: StylesConfig;
  onChange?: (value: string, action: string) => void;
  isSchool?: boolean;
}
interface CustomSelectProps extends Props<any> {
  emoji?: React.ReactNode | undefined;
  onEmojiClick: () => void;
}

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

const AddressAutocomplete: FC<IProps> = ({
  onSelectAddress,
  icon,
  bg,
  invalid = false,
  value,
  isWhiteG = false,
  onChange,
  placeholder,
  isSchool = false,
  variant = 'primary',
  ...props
}: IProps) => {
  const [options, setOptions] = useState([]);
  const [val, setVal] = useState('');

  const debouncedVal = useDebounce(val, 300); // delay in ms

  useEffect(() => {
    setVal(value);
    return () => {
      setVal('');
    };
  }, [value]);

  const handlePlaceSelected = async (newValue: unknown) => {
    const selectedPlace = newValue as { value: string; place_id: string };
    const placeDetails = await getPlaceDetails(selectedPlace?.place_id);
    const address = selectedPlace?.value?.split(',')[0];
    const zipCode = await extractZipCode(placeDetails?.address_components);
    setVal(address);
    onSelectAddress(address, zipCode);
  };

  function extractZipCode(
    addressComponents: [{ long_name: string; types: string }],
  ) {
    for (let i = 0; i < addressComponents.length; i++) {
      const types = addressComponents[i].types;
      if (types.includes('postal_code')) {
        return addressComponents[i].long_name;
      }
    }
    return '';
  }
  const handleInputChange = (query: string, { action }: { action: string }) => {
    if (action === 'input-change') {
      setVal(query);
      if (onChange) onChange(query, action);
    }
  };
  const addressAutocomplete = useCallback(async () => {
    if (debouncedVal?.length > 3) {
      const places = await getPlacesSuggestions(debouncedVal);
      const structuredOptions = places?.map(
        (place: {
          structured_formatting: { main_text: string };
          description: string;
        }) => {
          return {
            ...place,
            label: place?.description,
            value: place?.structured_formatting?.main_text,
          };
        },
      );
      setOptions(structuredOptions);
    }
  }, [debouncedVal]);

  useEffect(() => {
    addressAutocomplete();
  }, [addressAutocomplete]);

  useEffect(() => {
    if (debouncedVal?.length < 3) setOptions([]);
  }, [debouncedVal]);

  const styles: StylesConfig = {
    valueContainer: (provided) => ({
      ...provided,
      alignItems: 'center',
      padding: '2px 10px 2px 10px !important',
      color: primary.colors.ED[variant],
      ':active': {
        border: 'none !important',
      },
      input: {
        opacity: `${1} !important`,
      },
    }),
    control: (provided) => ({
      ...provided,
      width: '100%',
      borderRadius: isWhiteG ? '8px' : '100px',
      textAlign: 'start',
      minHeight: 'inherit !important',
      height: '52px !important',
      border: invalid
        ? `${isSchool ? 1 : isWhiteG ? 2 : 1}px solid ${
            primary.colors.ED[isWhiteG ? 'valencia' : 'danger']
          }`
        : isWhiteG
          ? `1px solid ${primary.colors.ED.athensGray}`
          : 'none',
      borderColor: invalid
        ? `${primary.colors.ED.danger}`
        : primary.colors.ED.dark,
      backgroundColor: bg ?? primary.colors.ED.light,
      fontSize: '16px',
      lineHeight: '26px',
      fontWeight: '500',
      fontFamily: primary.fonts.ED.primary,
      paddingLeft: variant == 'primary' ? '1rem' : '4px',
      paddingRight: '1rem',
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
          invalid ? primary.colors.ED.danger : 'none'
        } !important`,
      },
    }),
    input: (styles) => ({
      ...styles,
      color: `${
        isSchool ? primary.colors.ED.primary : primary.colors.ED[variant]
      } !important`,
      opacity: `${1} !important`,
      fontWeight: isSchool ? '500' : isWhiteG ? 'normal' : '500',
    }),
    placeholder: (styles) => ({
      ...styles,
      color: primary.colors.ED[variant],
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
    singleValue: (provided) => ({
      ...provided,
      color:
        !isWhiteG && invalid
          ? primary.colors.ED.danger
          : primary.colors.ED[isWhiteG ? 'stormcloud' : variant],
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
    option: (styles, state) => ({
      ...styles,
      backgroundColor: primary.colors.ED.light,
      color: state.isFocused
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
    dropdownIndicator: (styles) => ({
      ...styles,
      color: invalid ? primary.colors.ED.danger : primary.colors.ED[variant],
      ':hover': {
        color: invalid ? primary.colors.ED.danger : primary.colors.ED[variant],
      },
    }),
    menuList: (styles) => ({
      ...styles,
    }),
    menuPortal: (provided) => ({ ...provided, zIndex: 90 }),
    menu: (provided) => ({ ...provided, zIndex: 90 }),
  };

  const customProps = {
    ...(icon && {
      emoji:
        icon != undefined ? (
          <Image src={invalid ? factorialSvg : icon} alt='icon' />
        ) : undefined,
    }),
  };

  return (
    <Select
      {...customProps}
      {...props}
      data-testid='places-autocomplete-select'
      inputId='places-autocomplete-input'
      id='address'
      menuPortalTarget={
        typeof window !== 'undefined' ? document.body : undefined
      }
      menuPosition='absolute'
      components={{
        Control,
        IndicatorSeparator: null,
        DropdownIndicator: () => null,
      }}
      noOptionsMessage={() => null}
      placeholder={placeholder}
      onInputChange={handleInputChange}
      value={{
        label: value?.length == 0 ? placeholder : value,
      }}
      inputValue={val}
      onChange={handlePlaceSelected}
      onFocus={() => {
        setVal(value);
      }}
      onBlur={() => {
        setVal(value);
      }}
      isSearchable
      name='emoji'
      options={options}
      styles={styles}
      blurInputOnSelect
      filterOption={null}
    />
  );
};
export default AddressAutocomplete;

const Control = ({ children, ...props }: ControlProps) => {
  const { emoji, onEmojiClick } = props.selectProps as CustomSelectProps;
  const style = { cursor: 'pointer' };
  return (
    <components.Control {...props}>
      {emoji !== undefined && (
        <span onMouseDown={onEmojiClick} style={style}>
          {emoji}{' '}
        </span>
      )}
      {children}
    </components.Control>
  );
};
