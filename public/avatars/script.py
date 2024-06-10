import os

def rename_files_in_directory():
    # Get the current working directory
    current_directory = os.getcwd()
    
    # List all files in the current directory
    files = os.listdir(current_directory)
    new_files = []
    # Loop through each file in the directory
    for filename in files:
        # Check if it is a file (not a directory)
        if os.path.isfile(filename):
            # Create the new file name
            new_filename = filename.split(' ')[-1]
            new_filename = new_filename.lower()
            new_files.append(new_filename)
            # Rename the file
            #os.rename(filename, new_filename)
    
    print(new_files)

if __name__ == "__main__":
    rename_files_in_directory()
