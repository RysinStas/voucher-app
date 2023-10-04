"use client";

import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { sleep } from "@/utils";
import { AddFriendModal } from "./AddFriendModal";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
export interface Friend {
  id?: number;
  fullName: string;
  email: string;
  phoneNumber: string;
}

interface FriendOptionType extends Friend {
  inputValue?: string;
}

interface SearchProps {
  onChange: (...event: any[]) => void;
  onBlur: (...event: any[]) => void;
  value: Friend | null;
  error: boolean;
  helperText: string;
}

const filter = createFilterOptions<FriendOptionType>();

export const FriendSearch = ({
  onChange,
  value,
  error,
  onBlur,
  helperText,
}: SearchProps) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly FriendOptionType[]>([]);
  const [openAddForm, toggleOpenAddForm] = React.useState(false);
  const [dialogValue, setDialogValue] = React.useState<Friend>({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  const loading = open && options.length === 0;

  const handleClose = () => {
    setDialogValue({
      fullName: "",
      email: "",
      phoneNumber: "",
    });
    toggleOpenAddForm(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const newOption = {
      fullName: dialogValue.fullName,
      email: dialogValue.email,
      phoneNumber: dialogValue.phoneNumber,
      id: options.length,
    };
    setOptions([...options, newOption]);
    onChange(newOption);
    handleClose();
  };

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    // For demo purposes.
    (async () => {
      await sleep(1e3);
      if (active) {
        setOptions([...friends]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  return (
    <>
      <Autocomplete
        value={value}
        onChange={(event: any, newValue: any) => {
          if (typeof newValue === "string") {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpenAddForm(true);
              setDialogValue({
                fullName: newValue,
                email: "",
                phoneNumber: "",
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpenAddForm(true);
            setDialogValue({
              fullName: newValue.inputValue,
              email: "",
              phoneNumber: "",
            });
          } else {
            onChange(newValue);
          }
        }}
        autoHighlight
        onBlur={onBlur}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        isOptionEqualToValue={(option, value) =>
          option.fullName === value.fullName ||
          option.phoneNumber === value.phoneNumber
        }
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.fullName;
          }
          return option.phoneNumber
            ? `${option.fullName} (${option.phoneNumber})`
            : option.fullName;
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              fullName: `Add "${params.inputValue}"`,
              email: "",
              phoneNumber: "",
              id: 0,
            });
          }

          return filtered;
        }}
        freeSolo
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Friend"
            size="small"
            error={error}
            helperText={helperText}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  )}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      <AddFriendModal
        open={openAddForm}
        value={dialogValue}
        onChange={setDialogValue}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  );
};

//Mocked friend list
const friends: Friend[] = [
  {
    id: 1,
    fullName: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "+380501234567",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    phoneNumber: "+380502345678",
  },
  {
    id: 3,
    fullName: "Alice Johnson",
    email: "alice.johnson@example.com",
    phoneNumber: "+380503456789",
  },
  {
    id: 4,
    fullName: "Bob Brown",
    email: "bob.brown@example.com",
    phoneNumber: "+380504567890",
  },
  {
    id: 5,
    fullName: "Eva Wilson",
    email: "eva.wilson@example.com",
    phoneNumber: "+380505678901",
  },
  {
    id: 6,
    fullName: "David Lee",
    email: "david.lee@example.com",
    phoneNumber: "+380506789012",
  },
  {
    id: 7,
    fullName: "Olivia White",
    email: "olivia.white@example.com",
    phoneNumber: "+380507890123",
  },
  {
    id: 8,
    fullName: "William Taylor",
    email: "william.taylor@example.com",
    phoneNumber: "+380508901234",
  },
  {
    id: 9,
    fullName: "Mia Anderson",
    email: "mia.anderson@example.com",
    phoneNumber: "+380509012345",
  },
  {
    id: 10,
    fullName: "James Martinez",
    email: "james.martinez@example.com",
    phoneNumber: "+380509876543",
  },
  {
    id: 11,
    fullName: "Sophia Wilson",
    email: "sophia.wilson@example.com",
    phoneNumber: "+380509765432",
  },
  {
    id: 12,
    fullName: "Liam Johnson",
    email: "liam.johnson@example.com",
    phoneNumber: "+380509654321",
  },
  {
    id: 13,
    fullName: "Emma Davis",
    email: "emma.davis@example.com",
    phoneNumber: "+380509543210",
  },
  {
    id: 14,
    fullName: "Michael Garcia",
    email: "michael.garcia@example.com",
    phoneNumber: "+380509432109",
  },
  {
    id: 15,
    fullName: "Ava Martinez",
    email: "ava.martinez@example.com",
    phoneNumber: "+380509321098",
  },
  {
    id: 16,
    fullName: "Alexander Anderson",
    email: "alexander.anderson@example.com",
    phoneNumber: "+380509210987",
  },
  {
    id: 17,
    fullName: "Sofia Brown",
    email: "sofia.brown@example.com",
    phoneNumber: "+380509109876",
  },
  {
    id: 18,
    fullName: "Matthew Lee",
    email: "matthew.lee@example.com",
    phoneNumber: "+380509098765",
  },
  {
    id: 19,
    fullName: "Lily Davis",
    email: "lily.davis@example.com",
    phoneNumber: "+380509087654",
  },
  {
    id: 20,
    fullName: "Benjamin Taylor",
    email: "benjamin.taylor@example.com",
    phoneNumber: "+380509076543",
  },
  {
    id: 21,
    fullName: "Lucas Garcia",
    email: "lucas.garcia@example.com",
    phoneNumber: "+380509065432",
  },
  {
    id: 22,
    fullName: "Chloe Wilson",
    email: "chloe.wilson@example.com",
    phoneNumber: "+380509054321",
  },
  {
    id: 23,
    fullName: "Daniel Davis",
    email: "daniel.davis@example.com",
    phoneNumber: "+380509043210",
  },
  {
    id: 24,
    fullName: "Zoe Martinez",
    email: "zoe.martinez@example.com",
    phoneNumber: "+380509032109",
  },
  {
    id: 25,
    fullName: "Henry Anderson",
    email: "henry.anderson@example.com",
    phoneNumber: "+380509021098",
  },
  {
    id: 26,
    fullName: "Madison Brown",
    email: "madison.brown@example.com",
    phoneNumber: "+380509010987",
  },
  {
    id: 27,
    fullName: "Jackson Lee",
    email: "jackson.lee@example.com",
    phoneNumber: "+380509001876",
  },
  {
    id: 28,
    fullName: "Ella Davis",
    email: "ella.davis@example.com",
    phoneNumber: "+380509090765",
  },
  {
    id: 29,
    fullName: "Sebastian Taylor",
    email: "sebastian.taylor@example.com",
    phoneNumber: "+380509009654",
  },
  {
    id: 30,
    fullName: "Scarlett Garcia",
    email: "scarlett.garcia@example.com",
    phoneNumber: "+380509008543",
  },
];
