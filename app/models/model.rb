require 'json'
require_relative 'class_inherited_attributes'

# Abstract class with functions and attributes for all models
class Model
  # Class attributes
  include ClassInheritedAttributes
  # These are class instance variables shared across classes,
  # but that can be modified by the children
  class_inherited_attributes :instances, :db_filename
  @instances = {}
  @db_filename = ''

  # This is a class attribute shared by all classes
  @@max_id = 1 # First free id

  # Instance attributes
  attr_reader :id

  def initialize
    @id = @@max_id
    @@max_id += 1
  end

  def self.from_hash(model_hash)
    self.validate_hash(model_hash)
    model = self.new
    model_hash.each do |key, value|
      model.instance_variable_set("@#{key}", value)
    end
    # Check the global id is always the bigger one
    if model.id > @@max_id
      @@max_id = model.id + 1
    end
    model
  end

  def self.validate_hash(model_hash)
    model_hash.key?('id')
  end

  def to_hash
    hash = {}
    instance_variables.each do |attribute|
      hash[attribute.to_s.delete('@')] = instance_variable_get(attribute)
    end
    hash
  end

  def save
    if self.class.instances.key?(@id)
      raise KeyError, "Duplicate key (#{@id})"
    end
    # Save the object in our index
    self.class.instances[@id] = self
    # Save the object in the json file!
    self.class.save
  end

  # Saves the Model.instances attribute into a json file with name
  # Model.db_filename
  def self.save
    data_hash = []
    self.instances.each do |_, instance|
      data_hash.push(instance.to_hash)
    end
    file = File.open(self.db_filename, 'w')
    file.write(data_hash.to_json)
    file.close
  end

  # Returns all the saved instances of the class
  def self.all
    ###
    self.instances.values
    ###
  end

  # Returns the object with the given id
  def self.index?(id)
    ###
    self.instances.key?(id)
    ###
  end

  # Deletes the object with the given id
  def self.delete(id)
    ###
    self.instances.delete(id)
    ###
  end

  # Returns an instance of the model with the given id, or
  # nil if no instance exists with such id.
  def self.find(id)
    if self.instances.key?(id)
      self.instances[id]
    end
    # The else return nil is implicit
  end

  # Function to return all instances with such attributes.
  # The parameter values is a hash from field_name to field_value
  def self.filter(values)
    ###
    result = []
    self.instances.values.each do |instance|
      return_instance = true
      values.each do |field_name, field_value|
        return_instance &&= (instance.instance_variable_get(field_name) ==
                             field_value)
      end
      if return_instance
        result << instance
      end
    end
    result
    ###
  end

  # Function to check if an object with such attributes exists.
  # The parameter values is a hash from field_name to field_value
  def self.exists?(values)
    self.instances.values.each do |instance|
      return_instance = true
      values.each do |field_name, field_value|
        return_instance &&= (instance.instance_variable_get(field_name) ==
                             field_value)
      end
      if return_instance
        return true
      end
    end
    false
  end
end
