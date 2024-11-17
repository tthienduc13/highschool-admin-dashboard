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
import { useTagCreateMutation, useTagQuery } from '@/api/tag/tag.query';
import { useToast } from '@/hooks/use-toast';

type Props = {
  tag?: string;
  setTag: (tag: string) => void;
  icon?: React.ReactNode;
};

export function ComboboxTag(props: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(props.tag ?? '');
  const [newTag, setNewTag] = React.useState<string>('');
  const { toast } = useToast();
  const { mutateAsync: createTag, isPending: isLoading } =
    useTagCreateMutation();

  const [{ pageIndex, pageSize }] =
    React.useState<PaginationState>({
      pageIndex: -1,
      pageSize: 5
    });

  const { data: tagData, refetch } = useQuery(
    useTagQuery({
      pageSize: pageSize,
      pageNumber: pageIndex
    })
  );

  const handleCreateTag = async () => {
    if (newTag.length <= 1) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "New tag name must be at least 2 characters",
      });

      return;
    }

    try {
      await createTag({ newTagName: newTag });

      toast({
        title: "Creating...",
        variant: "default",
        description: "Create new tag successfully",
      });

      await refetch();

    } catch (error) {
      console.error('Error creating tag:', error);

      toast({
        title: "Failed",
        variant: "destructive",
        description: "Failed to create new tag",
      });
    }
  }



  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {props.icon && props.icon}
          {value
            ? tagData?.data.find((tag) => tag.newTagName === value)
              ?.newTagName
            : 'Select tags...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0">
        <Command>
          <CommandInput placeholder="Search framework..." onInput={(e) => setNewTag((e.target as HTMLInputElement).value)} />
          <CommandList>
            <CommandEmpty className='pt-0'>
              <Button
                className='w-full'
                onClick={handleCreateTag}
                disabled={isLoading}
              >
                Create new tag
              </Button>
            </CommandEmpty>
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
