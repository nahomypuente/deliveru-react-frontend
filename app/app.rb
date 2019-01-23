require 'json'
require 'sinatra/base'
require 'sinatra/json'
require 'sinatra/namespace'
require 'sinatra/reloader'

###
require_relative 'models'
###

# Main class of the application
class DeliveruApp < Sinatra::Application
  register Sinatra::Namespace

  enable :sessions unless test?

  configure :development do
    register Sinatra::Reloader

    pid = begin
            File.read('./node.pid')
          rescue StandardError
            nil
          end

    if pid.nil?
      ## Start the node server to run React
      pid = Process.spawn('npm run dev')
      Process.detach(pid)
      File.write('./node.pid', pid.to_s)
    end
  end

  ## Function to clean up the json requests.
  before do
    begin
      if request.body.read(1)
        request.body.rewind
        @request_payload = JSON.parse(request.body.read, symbolize_names: true)
      end
    rescue JSON::ParserError
      request.body.rewind
      puts "The body #{request.body.read} was not JSON"
    end
  end

  register do
    def auth
      condition do
        halt 401 unless session.key?(:logged_id) || self.settings.test?
      end
    end
  end

  ## API functions
  namespace '/api' do
    ###
    post '/login' do
      # TODO: get the email from the payload
      email = 'consumer@consumer.com'

      if CONSUMERS.key?(email)
        user = CONSUMERS[email]
        is_provider = false
      elsif PROVIDERS.key?(email)
        user = PROVIDERS[email]
        is_provider = true
      else
        # TODO: Return correct error
      end

      # TODO: Save the user id in the session

      json id: user[:id].to_s, isProvider: is_provider
    end

    post '/logout' do
      # TODO: Clear the session
    end

    get '/consumers', auth: nil do
      json CONSUMERS.values
    end

    post '/consumers' do
      # TODO: get email and location from payload
      email = 'consumer2@consumer.com'
      location = 2
      if email.nil? || location.nil?
        # TODO: Handle error response
      end
      if CONSUMERS.key?(email) ||
         PROVIDERS.key?(email)
        # TODO: Handle error response
      end
      MAX_ID += 1
      CONSUMERS[email] = {
          id: MAX_ID,
          email: email,
          location: location,
          balance: 0
      }
      json MAX_ID.to_s
    end

    get '/providers', auth: nil do
      # TODO: Get location from params if exists (return error if is is not valid integer)
      location_id = 2

      unless location_id.nil? || LOCATIONS.key?(location_id)
        # TODO: Handle error when location is not nil and doesn't exist in DB
      end

      if location_id.nil?
        users = PROVIDERS.values
      else
        users = PROVIDERS.values.select { |p| p[:location] == location_id }
      end
      json users
    end

    post '/providers' do
      # TODO: get email from payload
      email = 'provider2@provider.com'
      if email.nil? || location.nil?
        # TODO: Handle error response
      end
      if CONSUMERS.key?(email) ||
         PROVIDERS.key?(email)
        # TODO: Handle error response
      end

      # TODO: get location and store_name from payload
      location = 1
      store_name = 'Provider 2'

      if PROVIDERS.values.select { |p| p[:store_name] == store_name } .size > 0
        # TODO: Handle error response
      end
      if email.nil? || location.nil? || store_name.nil?
        # TODO: Handle error response
      end

      MAX_ID += 1
      PROVIDERS[email] = {
          id: MAX_ID,
          email: email,
          location: location,
          store_name: store_name,
          balance: 0
      }
      json MAX_ID.to_s
    end

    post '/users/delete/:id', auth: nil do
      # TODO: Get user_id from parameters, handle error if is not a valid integer
      user_id = 3

      provider = PROVIDERS.values.select { |p| p[:id] == user_id }
      consumer = CONSUMERS.values.select { |c| c[:id] == user_id }

      if user_id.nil?
        # TODO: Handle correct error
      elsif provider.size > 0
        PROVIDERS.delete(provider[:email])
      elsif consumer.size > 0
        CONSUMERS.delete(provider[:email])
      end
    end

    post '/items', auth: nil do
      # TODO: Get provider_id from parameters
      provider_id = 4
      if provider_id.nil?
        # TODO: Handle response error
      end
      unless PROVIDERS.key?(provider_id)
        # TODO: Handle response error
      end
      # TODO: Get name and price of item from payload
      name = 'Item 2'
      price = 10.0
      if name.nil?
        # TODO: Handle correct response
      end
      if price.nil?
        # TODO: Handle correct response
      end

      existing_item = ITEMS.values.select do |i|
        i[:provider] == provider_id && i[:name] == name
      end
      if existing_item.size > 1
        # TODO: Handle correct response
      end

      MAX_ID += 1
      ITEMS[MAX_ID] = {
          id: MAX_ID,
          provider: provider_id,
          name: name,
          price: price
      }
      json MAX_ID.to_s
    end

    post '/items/delete/:id' do
      # TODO: Get the item_id from parameters
      item_id = 5
      unless Item.key?(item_id)
        # TODO: Handle response error
      end
      # TODO: check that the item to delete is owned by the logged provider (in session)
      is_owner = false
      unless self.settings.test? || is_owner
        # TODO: Handle response error
      end
      ITEMS.delete(item_id)
    end

    get '/items', auth: nil do
      # TODO: Get provider from params if exists (return error if is is not valid integer)
      provider_id = 4

      unless provider_id.nil? || PROVIDERS.key?(provider_id)
        # TODO: Handle error when provider is not nil and doesn't exist in DB
      end

      if provider_id.nil?
        items = ITEMS.values
      else
        items = ITEMS.values.select { |p| p[:provider] == provider_id }
      end
      json items
    end

    post '/orders', auth: nil do
      # TODO: Get provider and consumer from payload if exist (return error if not valida int)
      consumer_id = 3
      provider_id = 4
      # TODO: Get items from payload (item id + amount)
      items = [{
          id: 5,
          amount: 2
      }]
      if provider_id.nil? || items.nil? || consumer_id.nil? || items.empty?
        # TODO: handle error with nil values
      end
      unless PROVIDERS.key?(provider_id) && CONSUMERS.key?(consumer_id)
        # TODO: handle error when is not present in the DB
      end

      # Create the new order
      MAX_ID += 1
      ORDERS[MAX_ID] = {
          id: MAX_ID,
          provider: provider_id,
          consumer: consumer_id,
          items: items,  # TODO: check if items exists on the database if not handle the error
          status: 'payed',
          total: 100.0  # TODO: calculate the total amount of the order
      }

      # TODO: update balances for provider and consumer
      json MAX_ID.to_s
    end

    get '/orders/detail/:id', auth: nil do
      # TODO: get the order id from the params. Handle error when is not a valid integer
      order_id = 6

      unless ORDERS.key?(order_id)
        # TODO: handle error when the order doesn't exist
      end
      order = ORDERS[order_id]

      # TODO: traverse all the order's items and retrieve the necessary information
      item = ITEMS[5]
      response = [{
          id: 5,
          name: 'Item 1',
          amount: 3,
          price: 50.0
      }]
      json response
    end

    get '/orders', auth: nil do
      # TODO: get the user id from the paramters (handle error if not a valid integer)
      user_id = 3
      if CONSUMERS.key?(user_id)
        orders = ORDERS.values.select { |o| o.consumer == user_id }
      elsif PROVIDERS.key?(user_id)
        orders = ORDERS.values.select { |o| o.provider == user_id }
      else
        # TODO: Handle error when not a valid user_id
      end

      # TODO: Traverse the orders to get the necessary information
      response = [{
          id: 6,
          consumer: 3,
          provider: 4,
          consumer_email: 'consumer1@consumer.com',
          provider_name: 'Provider 1',
          order_amount: 150.0,
          status: 'delivered',
          consumer_location: 1
      }]
      json response
    end

    post '/deliver/:id', auth: nil do
      # TODO: Get the order id from parameters, check if is a valid integer
      order_id = 6
      unless ORDERS.key?(order_id)
        # TODO: Handle error
      end
      ORDERS[:order_id][:status] = 'delivered'
    end

    post '/orders/delete/:id', auth: nil do
      # TODO: Get the order id from parameters, check if is a valid integer
      order_id = 6
      unless ORDERS.key?(order_id)
        # TODO: Handle error
      end
      ORDERS.delete(order_id)
    end

    get '/users/:id' do
      # TODO: Get the user id from parameters, check if is a valid integer
      user_id = 3
      if user_id.nil?
        # TODO Handle error
      elsif PROVIDERS.values.select { |p| p[:id] == user_id } .size > 0
        user = PROVIDERS.values.select{ |p| p[:id] == user_id }[0]
      elsif CONSUMERS.values.select { |c| c[:id] == user_id } .size > 0
        user = CONSUMERS.values.select{ |c| c[:id] == user_id }[0]
      else
        # TODO Handle error
      end

      response = {
        email: user[:email], balance: user[:balance]
      }
      json response
    end

    get '/locations' do
      json LOCATIONS.values
    end
    ###
    get '*' do
      halt 404
    end
  end

  # This goes last as it is a catch all to redirect to the React Router
  get '/*' do
    erb :index
  end
end
