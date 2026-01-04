import { useState } from "react";
import { Tag } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface TagManagerProps {
  currentTags: Tag[];
  allTags: Tag[];
  onAddTag: (tagName: string) => void;
  onRemoveTag: (tagId: number) => void;
}

export function TagManager({ currentTags, allTags, onAddTag, onRemoveTag }: TagManagerProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const availableTags = allTags.filter(
    (tag) => !currentTags.some((current) => current.id === tag.id)
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {currentTags.map((tag) => (
          <Badge 
            key={tag.id} 
            variant="secondary" 
            className="pl-3 pr-1 py-1.5 flex items-center gap-1.5 rounded-md bg-secondary text-secondary-foreground font-normal border-0 text-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tag.color || '#9ca3af' }}></span>
            {tag.name}
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 p-0 hover:bg-destructive/20 rounded-sm ml-0.5"
              onClick={() => onRemoveTag(tag.id)}
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
            </Button>
          </Badge>
        ))}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 rounded-md border border-dashed border-input text-muted-foreground hover:text-foreground hover:border-accent-foreground hover:bg-accent px-3 text-xs">
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              添加标签
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-[200px] rounded-lg shadow-xl border-border" side="right" align="start">
            <Command className="rounded-lg">
              <CommandInput 
                placeholder="选择或创建..." 
                value={inputValue}
                onValueChange={setInputValue}
                className="h-10 text-sm"
              />
              <CommandList className="max-h-[200px] overflow-y-auto custom-scrollbar">
                <CommandEmpty className="py-3 px-4 text-center">
                   <div className="text-xs text-muted-foreground mb-2">未找到标签</div>
                   {inputValue && (
                       <Button 
                          variant="secondary" 
                          size="sm" 
                          className="w-full justify-start h-8 text-xs bg-primary/10 text-primary hover:bg-primary/20"
                          onClick={() => {
                              onAddTag(inputValue);
                              setOpen(false);
                              setInputValue("");
                          }}
                       >
                          创建 "{inputValue}"
                       </Button>
                   )}
                </CommandEmpty>
                <CommandGroup heading="可用标签" className="p-1.5">
                  {availableTags.map((tag) => (
                    <CommandItem
                      key={tag.id}
                      onSelect={() => {
                        onAddTag(tag.name);
                        setOpen(false);
                      }}
                      className="rounded-md text-sm py-2 px-2 cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground"
                    >
                      <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: tag.color || '#9ca3af' }}></span>
                      {tag.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
