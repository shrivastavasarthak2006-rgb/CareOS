import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CareNotesPanel = ({ notes, currentRole, onAddNote }) => {
  const [newNote, setNewNote] = useState('');
  const [filter, setFilter] = useState('all');

  const noteTypes = [
    { value: 'all', label: 'All Notes', icon: 'FileText' },
    { value: 'clinical', label: 'Clinical', icon: 'Stethoscope' },
    { value: 'nursing', label: 'Nursing', icon: 'Activity' },
    { value: 'family', label: 'Family', icon: 'Users' }
  ];

  const getTypeColor = (type) => {
    const colors = {
      clinical: 'bg-primary/10 text-primary border-primary/20',
      nursing: 'bg-secondary/10 text-secondary border-secondary/20',
      family: 'bg-success/10 text-success border-success/20',
      system: 'bg-muted text-muted-foreground border-border'
    };
    return colors?.[type] || colors?.system;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (newNote?.trim()) {
      onAddNote(newNote);
      setNewNote('');
    }
  };

  const filteredNotes = filter === 'all'
    ? notes
    : notes?.filter(note => note?.type === filter);

  const canAddNotes = currentRole === 'doctor' || currentRole === 'nurse';

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-elevation-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-foreground mb-1">
            Care Notes
          </h2>
          <p className="text-sm text-muted-foreground">
            Collaborative documentation and updates
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          iconName="Filter"
          iconPosition="left"
        >
          Filter
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {noteTypes?.map(type => (
          <Button
            key={type?.value}
            variant={filter === type?.value ? 'default' : 'outline'}
            size="sm"
            iconName={type?.icon}
            iconPosition="left"
            onClick={() => setFilter(type?.value)}
          >
            {type?.label}
          </Button>
        ))}
      </div>
      {canAddNotes && (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Add a care note..."
              value={newNote}
              onChange={(e) => setNewNote(e?.target?.value)}
              className="flex-1"
            />
            <Button
              type="submit"
              variant="default"
              iconName="Send"
              disabled={!newNote?.trim()}
            >
              <span className="hidden sm:inline">Add Note</span>
            </Button>
          </div>
        </form>
      )}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredNotes?.map((note, index) => (
          <div
            key={index}
            className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-colors duration-250"
          >
            <div className="flex items-start gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="User" size={16} color="var(--color-primary)" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-foreground">
                    {note?.author}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getTypeColor(note?.type)}`}>
                    {note?.type?.charAt(0)?.toUpperCase() + note?.type?.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-foreground mb-2">
                  {note?.content}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Icon name="Clock" size={12} />
                    <span>{note?.timestamp}</span>
                  </div>
                  {note?.edited && (
                    <span className="flex items-center gap-1">
                      <Icon name="Edit" size={12} />
                      Edited
                    </span>
                  )}
                </div>
              </div>
            </div>

            {note?.attachments && note?.attachments?.length > 0 && (
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {note?.attachments?.map((attachment, idx) => (
                    <button
                      key={idx}
                      className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg text-xs hover:bg-muted/70 transition-colors duration-250"
                    >
                      <Icon name="Paperclip" size={14} />
                      <span className="truncate max-w-32">{attachment}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {filteredNotes?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileText" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No care notes available</p>
        </div>
      )}
    </div>
  );
};

export default CareNotesPanel;