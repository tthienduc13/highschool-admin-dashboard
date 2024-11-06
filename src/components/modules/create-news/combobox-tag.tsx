'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';
import { useTagQuery } from '@/api/tag/tag.query';

type Props = {
  setTag: (tag: string) => void;
};

export function ComboboxTag(props: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  //const [search, setSearch] = React.useState(''); // Search state
  //const debouncedSearch = useDebounceValue(search, 300);

  const [{ pageIndex, pageSize }] =
    React.useState<PaginationState>({
      pageIndex: -1,
      pageSize: 5
    });

  const { data: tagData } = useQuery(
    useTagQuery({
      pageSize: pageSize,
      pageNumber: pageIndex,
      //search: debouncedSearch
    })
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? tagData?.data.find((tag) => tag.newTagName === value)
              ?.newTagName
            : 'Select tags...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty className='pt-0'><Button className='w-full'>Create new tag</Button></CommandEmpty>
            <CommandEmpty>No tags found.</CommandEmpty>
            <CommandGroup>
              {tagData?.data.map((tag) => (
                <CommandItem
                  key={tag.id}
                  value={tag.newTagName}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                    props.setTag(tag.id);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === tag.newTagName ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {tag.newTagName}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
